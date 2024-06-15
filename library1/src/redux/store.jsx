import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // userReducer olarak değil, userSlice.reducer olarak import edilmesi gerekiyor
import { thunk } from 'redux-thunk'

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (GetDefaultMiddleware) => GetDefaultMiddleware({ serializableCheck: false })
});
