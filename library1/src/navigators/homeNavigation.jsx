import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import profile from '../Component/profile/Profile'
import PersonalInformation from '../Component/profile/PersonalInformation'
import PasswordTransactions from '../Component/profile/PasswordTransactions'
import ProtectionofPersonalData from '../Component/profile/ProtectionofPersonalData'
import { Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import confidentialityAgreement from "../Component/profile/confidentialityAgreement"
import { useNavigation } from '@react-navigation/native';
import bookDetail from "../Component/bookkDetail/bookDetail"
import MyBooks from '../Component/MyLibrary/myLiblary/MyBooks'
import MyLibrary from '../Component/MyLibrary/MyLibrary'
import MyDownloads from "../Component/MyLibrary/myLiblary/MyDownloads"
import MyReadinglist from '../Component/MyLibrary/myLiblary/MyReadingList'
import BooksLikes from '../Component/MyLibrary/myLiblary/BooksLikes'
import AuthorsLike from '../Component/MyLibrary/myLiblary/AuthorsLike'
import Home from '../Component/Home/Home'
import chat from '../Component/Chat/chat'

import AutherDetail from '../Component/authorDetail/AutherDetail'
import PdfPage from '../Component/Pdf/PdfPage'
import AddBook from '../Screens/AddBook'
import AddBook2 from '../Screens/AddBook2'
import AddAuthor from '../Screens/AddAuthor'
import BookList from '../Screens/BookList'
import PdfViewer from '../Screens/PdfViewer'
import BestBooks from '../Component/MyLibrary/myLiblary/bestBook'
import bestAuther from '../Component/authorDetail/bestAuther'

const Stack = createStackNavigator()
function homeNavigation() {
    const navigation = useNavigation()
    return (
        < Stack.Navigator>

            <Stack.Screen
                name="Ana Sayfa"
                component={Home}
                options={{
                    headerTransparent: true,
                    headerTintColor: 'white',

                }}
            />
            <Stack.Screen
                name="profile"
                component={profile}
                options={{
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            {/* <Stack.Screen
                name="Üye ekranı"
                component={Signup}
                options={{
                    headerTransparent: true,
                    headerTintColor: 'rgba(255, 255, 255, 0)'
                }}
            /> */}
            {/* <Stack.Screen
                name="Şifremi Unuttum"
                component={ForgotPassword}
                options={{
                    headerTransparent: true,
                    headerTintColor: 'rgba(255, 255, 255, 0)'
                }}
            /> */}
            <Stack.Screen
                name="Kitap Detay"
                component={bookDetail}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="yazar Detay"
                component={AutherDetail}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="Kişisel Bilgiler"
                component={PersonalInformation}

                options={{
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}


            />

            <Stack.Screen
                name="Kitap Öneri"
                component={chat}

                options={{
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}


            />
            <Stack.Screen
                name="Şifre İşlemleri"
                component={PasswordTransactions}
                options={{
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Kişisel Verilerin Korunması"
                component={ProtectionofPersonalData}
                options={{
                    headerTransparent: false,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity style={{ marginLeft: 15, borderWidth: 5, borderColor: "#f2f2f5", borderRadius: 14 }} onPress={() => navigation.goBack()}>
                            <AntDesign name="closecircle" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Gizlilik Sözleşmesi"
                component={confidentialityAgreement}
                options={{
                    headerTransparent: false,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="Kitaplarım"
                component={MyBooks}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.navigate("Kütüphanem")}>
                            <AntDesign name="left" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Kütüphanem"
                component={MyLibrary}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="İndirdiklerim"
                component={MyDownloads}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.navigate("Kütüphanem")}>
                            <AntDesign name="left" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Okuma Listem"
                component={MyReadinglist}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'black',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.navigate("Kütüphanem")}>
                            <AntDesign name="leftleft" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Beğendiğim Kitaplar"
                component={BooksLikes}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'black',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.navigate("Kütüphanem")}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Beğendiğim Yazarlar"
                component={AuthorsLike}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.navigate("Kütüphanem")}>
                            <AntDesign name="left" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Pdf"
                component={PdfPage}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Kitap Ekle"
                component={AddBook}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Kitap Ekle2"
                component={AddBook2}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen
                name="yazar ekle item"
                component={AddAuthor}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Kitap liste"
                component={BookList}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="PdfViewer"
                component={PdfViewer}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="BestBooks"
                component={BestBooks}
                options={({ navigation }) => ({
                    headerTransparent: false,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="En Çok Puan Alan Yazar"
                component={bestAuther}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    )
}

export default homeNavigation