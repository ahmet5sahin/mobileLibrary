import React, { useState } from 'react';
import { Text, View, Image, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateUserInfo } from '../../redux/userSlice'; // Güncellenmiş import yolu

const { width, height } = Dimensions.get("window");

function PersonalInformation() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [name, setName] = useState(user?.name || '');
    const [surname, setSurname] = useState(user?.surname || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleSave = () => {
        dispatch(updateUserInfo({ name, surname, email }));
    };
    return (
        <ScrollView>
            <View style={{ borderBlockColor: "white", borderTopRightRadius: 44, flex: 1 }}>
                <Image style={{ width: "100%", height: height * 0.30 }} source={require('../../../assets/profilepage2.jpg')} />
                <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
                    <View style={{ backgroundColor: "white", width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 55, position: "absolute", top: -115, borderTopLeftRadius: 30, borderTopEndRadius: 30, }}>
                        <Text style={{ marginTop: 40, marginBottom: 15 }}></Text>
                    </View>
                    <Text style={{ marginBottom: 15, fontSize: 18, paddingHorizontal: 32 }}>Adınız</Text>
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
                            onChangeText={text => setName(text)}
                            value={name}
                            placeholder="Adınız"
                        />
                    </View>
                    <Text style={{ marginBottom: 15, fontSize: 18, paddingHorizontal: 32, marginTop: 15 }}>Soyadınız</Text>
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
                            placeholder="Soyadınız"
                        />
                    </View>
                    <Text style={{ marginBottom: 15, fontSize: 18, paddingHorizontal: 32, marginTop: 15 }}>E-posta Adresi</Text>
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
                            placeholder="E-posta Adresiniz"
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
                            onPress={handleSave}
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
    )
}

export default PersonalInformation;
