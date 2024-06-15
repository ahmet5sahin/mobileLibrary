import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, autoLogin } from '../redux/userSlice';

function LoginPage() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(autoLogin());
    }, []);

    const { error } = useSelector((state) => state.user);

    const handleLogin = () => {
        dispatch(login({ email, password }));
        setShowError(true);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <Image style={{ height: "100%", width: "100%", position: 'absolute' }} source={require("../../assets/giris.jpg")} />


            <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 220, paddingBottom: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 2, fontSize: 41 }}>
                        Giriş Yap
                    </Text>
                </View>
                <View style={{ flex: 3, alignItems: 'center', marginHorizontal: 24, justifyContent: 'center', marginTop: 72 }}>
                    <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 12, width: '100%', marginBottom: 14 }}>
                        <TextInput
                            inputMode='email'
                            onChangeText={setEmail}
                            value={email}
                            placeholder='E-Posta Adresiniz'
                            placeholderTextColor={'gray'}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Şifremi Unuttum")}
                        style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 5 }}
                    >
                        <AntDesign name="questioncircleo" size={14} color="white" />
                        <Text style={{ color: 'white', paddingLeft: 8 }}>
                            Şifremi Unuttum
                        </Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 12, width: '100%', marginBottom: 14 }}>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            placeholder='Şifre'
                            placeholderTextColor={'gray'}
                            secureTextEntry
                        />
                    </View>
                    {showError && error && (
                        <Text style={{ color: 'red', marginBottom: 10 }}>
                            {error === 'auth/invalid-email' || error === 'auth/missing-password'
                                ? 'E-posta veya şifre eksik'
                                : 'Giriş yaparken bir hata oluştu: ' + error}
                        </Text>
                    )}
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{ width: '100%', backgroundColor: '#2da1dc', padding: 12, borderRadius: 14, marginBottom: 8, marginTop: 22, justifyContent: "center", alignItems: "center" }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            Giriş Yap
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ color: 'white' }}>
                            Hesabınız yok mu?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Üye ekranı")}>
                            <Text style={{ color: '#00BFFF', paddingLeft: 5 }}>
                                Kayıt Ol
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default LoginPage;
