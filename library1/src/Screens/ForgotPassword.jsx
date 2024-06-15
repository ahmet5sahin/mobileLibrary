import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword({ navigation }) { // navigation prop'unu al



    const handleReset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Kullanıcı şifresi yenileme isteği');
                alert("İstek gönderildi. Lütfen mail kutunuzu kontrol ediniz. ( Maili göremiyorsanız spam kutunuzu kontrol etmeyi unutmayın )")
            })
            .catch((error) => alert(error.message));
    };

    const [email, setEmail] = useState('');
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <Image style={{ height: "100%", width: "100%", position: 'absolute' }} source={require("../../assets/giris3.jpg")} />
            {/* <View style={{ flexDirection: "row", justifyContent: "space-around", height: "100%", width: "100%", position: 'absolute' }}>
                <Image style={{ height: 225, width: 90 }} source={require("../../assets/light.png")} />
                <Image style={{ height: 160, width: 65 }} source={require("../../assets/light.png")} />
            </View> */}

            <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 220, paddingBottom: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 2, fontSize: 31 }}>
                        Şifremi Unuttum
                    </Text>
                </View>

                <View style={{ flex: 1, backgroundColor: '#c6d4f2', paddingHorizontal: 10, marginTop: 100, marginBottom: 12, marginHorizontal: 24, justifyContent: "center", alignItems: "center", borderRadius: 11 }}>
                    <Text style={{ fontSize: 17, color: 'black', marginBottom: 5 }}>
                        Şifrenizi yenilemek için e-posta adresinize bir link gelecektir.
                        Gelen linke tıklayıp yeni şifrenizi belirleyebilirsiniz.
                    </Text>
                </View>

                <View style={{ flex: 2, alignItems: 'center', marginHorizontal: 24, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 12, width: '100%', marginBottom: 14 }}>
                        <TextInput onChangeText={setEmail} placeholder='E-Posta Adresiniz' placeholderTextColor={'gray'} />
                    </View>

                    <TouchableOpacity onPress={handleReset} style={{ width: '100%', backgroundColor: '#2da1dc', padding: 12, borderRadius: 14, marginBottom: 8, marginTop: 22, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            Şifremi Yenile
                        </Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("login")}>
                            <Text style={{ color: 'white', paddingLeft: 5 }}>
                                Giriş Ekranına Dön

                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ForgotPassword;
