import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    console.log("email", email);
    console.log("password", password);

    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;

        const userData = {
            token,
            user: user,
        };

        await AsyncStorage.setItem("userToken", token);
        return userData;

    } catch (error) {
        console.log("userSlice 23 line error:", error.message);
        return rejectWithValue(error.message);
    }
});

export const autoLogin = createAsyncThunk('user/autoLogin', async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
            return token;
        } else {
            throw new Error("User Not Found");
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const auth = getAuth();
        await signOut(auth);
        await AsyncStorage.removeItem("userToken");
        return null;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const register = createAsyncThunk("user/register", async ({ email, password }, { rejectWithValue }) => {
    try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;
        await sendEmailVerification(user);
        await AsyncStorage.setItem("userToken", token);
        return token;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const redirectToLogin = createAsyncThunk("user/redirectToLogin", async (_, { dispatch }) => {
    const navigation = useNavigation();
    navigation.navigate('LoginPage'); // Burada 'LoginPage', oturum açma ekranının adı olmalı
});

const initialState = {
    isAuth: false,
    token: null,
    user: null,
    error: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAout: (state) => {
            state.isAuth = false;
        },
        updateUserInfo: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuth = false;
                state.error = action.payload;
            })
            .addCase(autoLogin.pending, (state) => {
                state.isAuth = false;
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.isAuth = true;
                state.token = action.payload;
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.isAuth = false;
                state.token = null;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
                state.token = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.isAuth = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuth = true;
                state.token = action.payload;
                redirectToLogin();
            })
            .addCase(register.rejected, (state, action) => {
                state.isAuth = false;
                state.error = "email ve şifreyi kontrol et";
            });

        // Diğer ekstra reducers burada devam eder...

    }
});

export const { setAout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
