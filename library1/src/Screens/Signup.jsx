import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice';

function Signup() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert("Hata", "Şifreler eşleşmiyor. Lütfen doğru şifreleri giriniz.");
            return;
        }
        dispatch(register({ email, password }))
            .then(() => {
                dispatch(setUserDetails({ name, lastName, email }));
                navigation.navigate('Profile');
            });
    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <Image style={{ height: "100%", width: "100%", position: 'absolute' }} source={require("../../assets/giris3.jpg")} />
            {/* <View style={{ flexDirection: "row", justifyContent: "space-around", height: "100%", width: "100%", position: 'absolute' }}>
                <Image style={{ height: 225, width: 90 }} source={require("../../assets/light.png")} />
                <Image style={{ height: 160, width: 65 }} source={require("../../assets/light.png")} />
            </View> */}

            <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 240, paddingBottom: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 2, fontSize: 51 }}>
                        Üye Ol
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 40, justifyContent: 'center', marginTop: 132 }}>
                    <View style={{ backgroundColor: "white", padding: 15, borderRadius: 12, width: '100%', height: 50, marginBottom: 14 }}>
                        <TextInput onChangeText={setName} value={name} placeholder='Adınız' placeholderTextColor={'gray'} />
                    </View>
                    <View style={{ backgroundColor: "white", padding: 15, borderRadius: 12, width: '100%', height: 50, marginBottom: 14 }}>
                        <TextInput onChangeText={setLastName} value={lastName} placeholder='Soyadınız' placeholderTextColor={'gray'} />
                    </View>
                    <View style={{ backgroundColor: "white", padding: 15, borderRadius: 12, width: '100%', height: 50, marginBottom: 14 }}>
                        <TextInput onChangeText={setEmail} value={email} placeholder='E-Posta Adresiniz' placeholderTextColor={'gray'} />
                    </View>
                    <View style={{ backgroundColor: "white", padding: 15, borderRadius: 12, width: '100%', height: 50, marginBottom: 14 }}>
                        <TextInput onChangeText={setPassword} value={password} placeholder='Şifre' placeholderTextColor={'gray'} secureTextEntry />
                    </View>
                    <View style={{ backgroundColor: "white", padding: 15, borderRadius: 12, width: '100%', height: 50, marginBottom: 14 }}>
                        <TextInput onChangeText={setConfirmPassword} value={confirmPassword} placeholder='Şifre Tekrar' placeholderTextColor={'gray'} secureTextEntry />
                    </View>
                    <TouchableOpacity
                        onPress={handleRegister}
                        style={{ width: '100%', backgroundColor: '#2da1dc', padding: 12, borderRadius: 14, marginBottom: 8, marginTop: 22, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            Üye Ol
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: "white" }}>
                            Hesabınız var mı?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("login")}>
                            <Text style={{ color: '#00BFFF', paddingLeft: 5 }}>
                                Giriş Yap.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Signup;
