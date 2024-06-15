import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../Screens/Signup';
import loginPage from '../Screens/loginPage';
import ForgotPassword from '../Screens/ForgotPassword';
import Enter from '../Screens/Enter';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const AuthStack = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator
            initialRouteName='Enter'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Enter"
                component={Enter}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-circle-outline" size={24} color="black" />
                    ),
                }}
            />
            <Stack.Screen
                name="login"
                component={loginPage}
                options={{
                    headerShown: true,  // Show header for this screen
                    headerTransparent: true,
                    headerTintColor: 'rgba(255, 255, 255, 0)',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={34} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Şifremi Unuttum"
                component={ForgotPassword}
                options={{
                    headerShown: true,  // Show header for this screen
                    headerTransparent: true,
                    headerTintColor: 'rgba(255, 255, 255, 0)',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={34} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Üye ekranı"
                component={Signup}
                options={{
                    headerShown: true,  // Show header for this screen
                    headerTransparent: true,
                    headerTintColor: 'rgba(255, 255, 255, 0)',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 12 }}
                            onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={34} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Giris Sayfasi"
                component={Enter}
                options={{
                    headerShown: true,  // Show header for this screen
                    headerTransparent: true,
                    headerTintColor: 'white',
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})
