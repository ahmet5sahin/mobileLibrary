import React, { useState } from 'react';
import { Text, View, Image, Dimensions, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';  // Firebase konfigürasyon dosyasını import edin

const { width, height } = Dimensions.get("window");

function PasswordTransactions() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const handleReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Kullanıcı şifresi yenileme isteği');
                Alert.alert("İstek gönderildi", "Lütfen mail kutunuzu kontrol ediniz. (Maili göremiyorsanız spam kutunuzu kontrol etmeyi unutmayın)");
            })
            .catch((error) => Alert.alert("Hata", error.message));
    };

    return (
        <ScrollView>
            <View style={{ borderBlockColor: "white", borderTopRightRadius: 44, flex: 1 }}>
                <Image style={{ width: "100%", height: height * 0.30 }} source={require('../../../assets/profilepage2.jpg')} />
                <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
                    <View style={{ backgroundColor: "white", width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 55, position: "absolute", top: -115, borderTopLeftRadius: 30, borderTopEndRadius: 30, }}>
                        <Text style={{ marginTop: 40, marginBottom: 15 }}></Text>
                    </View>
                    <Text style={{ marginBottom: 15, fontSize: 18, paddingHorizontal: 32 }}>Eski Şifreniz</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                        <TextInput
                            style={{
                                height: 50,
                                width: "85%",
                                borderColor: 'gray',
                                borderWidth: 1,
                                paddingHorizontal: 12,
                                borderRadius: 12,
                            }}
                            onChangeText={text => setName(text)}
                            value={name}
                            placeholder="Şifre"
                            secureTextEntry
                        />
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: "center", marginTop: 34, marginBottom: 24 }}>
                            <Text style={{ fontSize: 17, color: "#69707c" }}>Şifreniz 6 karakter olmalı</Text>
                            <Text style={{ fontSize: 17, color: "#69707c" }}>ve içerisinde özel karakter içermelidir</Text>
                        </View>
                    </View>
                    <Text style={{ marginBottom: 15, fontSize: 18, paddingHorizontal: 32, marginTop: 15 }}>Yeni Şifreniz</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                        <TextInput
                            style={{
                                height: 50,
                                width: "85%",
                                borderColor: 'gray',
                                borderWidth: 1,
                                paddingHorizontal: 12,
                                borderRadius: 12,
                            }}
                            onChangeText={text => setSurname(text)}
                            value={surname}
                            placeholder="Şifre"
                            secureTextEntry
                        />
                    </View>
                    <Text style={{ marginBottom: 15, fontSize: 18, paddingHorizontal: 32, marginTop: 15 }}>Yeni Şifre Tekrar</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                        <TextInput
                            style={{
                                height: 50,
                                width: "85%",
                                borderColor: 'gray',
                                borderWidth: 1,
                                paddingHorizontal: 12,
                                borderRadius: 12,
                            }}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            placeholder="E-posta"
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#465de2',
                                paddingVertical: 12,
                                paddingHorizontal: 40,
                                borderRadius: 12,
                                marginTop: 34,
                                height: 45,
                                width: "85%"
                            }}
                            onPress={handleReset}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 17,
                                fontWeight: 'bold',
                            }}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default PasswordTransactions;
