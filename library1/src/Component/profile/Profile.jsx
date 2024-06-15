import React from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity, Alert, BackHandler, ScrollView } from 'react-native'
import { Ionicons, Entypo, MaterialIcons, AntDesign, Feather, Octicons, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { setAout, logout } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';


const { width, height } = Dimensions.get("window")

function profile() {
    const dispatch = useDispatch()

    const navigation = useNavigation();
    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Çıkış yapmak istediğinize emin misiniz?',
            [
                {
                    text: 'Hayır',
                    onPress: () => console.log('İptal edildi'),
                    style: 'cancel',
                },
                {
                    text: 'Evet',
                    onPress: () => {
                        // Çıkış işlemi burada gerçekleştirilir
                        console.log('Çıkış yapıldı');
                        dispatch(logout())

                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (


        <View style={{ backgroundColor: "white", borderTopRightRadius: 44, flex: 1 }}>

            <Image style={{ width: "100%", height: height * 0.30 }}

                source={require('../../../assets/books23.jpg')}
            />

            <View style={{
                width: '100%',
                height: '60%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <View style={{ backgroundColor: "white", width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 55, position: "absolute", top: -85, borderTopLeftRadius: 40, borderTopEndRadius: 40, }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 110, marginBottom: 15 }}>Fırat Yıldırım</Text>
                    <View style={{}}>
                        <View style={{
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 9, justifyContent: "center", alignItems: 'center', width: 130, height: 130, borderWidth: 0.2, borderColor: "black", position: 'absolute', top: -220, right: 80, left: 80, backgroundColor: "white", borderRadius: 3333
                        }}><Ionicons name="person-outline" size={100} color="black" /></View>


                        <TouchableOpacity onPress={() => navigation.navigate("Kişisel Bilgiler")} style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: "center", borderBottomColor: '#d6d4d4', borderBottomWidth: 0.2, marginTop: 10, paddingBottom: 15
                        }} >
                            <View style={{ padding: 10 }}><Ionicons name="person-circle-outline" size={24} color="black" /></View>
                            <Text style={{ fontSize: 16, flex: 1 }}>Kişisel Bilgiler</Text>
                            <View style={{ justifyContent: 'flex-end' }}><Entypo name="chevron-small-right" size={27} color="black" /></View>
                        </TouchableOpacity>




                        {/* <TouchableOpacity onPress={() => navigation.navigate("Şifre İşlemleri")}
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomColor: '#d6d4d4', borderBottomWidth: 0.2, marginTop: 10, paddingBottom: 15 }}>
                            <View style={{ padding: 10 }}><MaterialIcons name="lock-outline" size={26} color="black" /></View>
                            <Text style={{ fontSize: 16, flex: 1 }}>Şifre İşlemleri</Text>
                            <View style={{ marginLeft: 'auto' }}><Entypo name="chevron-small-right" size={27} color="black" /></View>
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={() => navigation.navigate("Kişisel Verilerin Korunması")}
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomColor: '#d6d4d4', borderBottomWidth: 0.2, marginTop: 10, paddingBottom: 15 }}>
                            <View style={{ padding: 10 }}><MaterialIcons name="my-library-books" size={24} color="black" /></View>
                            <Text style={{ fontSize: 16 }}>Kişisel Verilerin Korunması</Text>
                            <View style={{ marginLeft: 11 }}><Entypo name="chevron-small-right" size={27} color="black" /></View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Gizlilik Sözleşmesi")} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomColor: '#d6d4d4', borderBottomWidth: 0.2, marginTop: 10, paddingBottom: 15 }}>
                            <View style={{ padding: 10 }}><AntDesign name="book" size={24} color="black" /></View>
                            <Text style={{ fontSize: 16, flex: 1 }}>Gizlilik Sözleşmesi</Text>
                            <View style={{ marginLeft: 'auto' }}><Entypo name="chevron-small-right" size={27} color="black" /></View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10,
                                paddingBottom: 10,
                            }}
                            onPress={handleLogout}
                        >
                            <View style={{ padding: 10 }}>
                                <Feather name="log-out" size={24} color="black" />
                            </View>
                            <Text style={{ fontSize: 16, flex: 1 }}>Çıkış</Text>
                            <View style={{ marginLeft: 'auto' }}>
                                <Entypo name="chevron-small-right" size={27} color="black" />
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>


            </View>
        </View>



    )
}

export default profile