import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons } from '@expo/vector-icons';
import homeNavigation from "./homeNavigation";
import Search from '../Component/Search/Search';
import MyLibrary from "../Component/MyLibrary/MyLibrary";
import profile from "../Component/profile/Profile";

const Tab = createBottomTabNavigator();

function Main() {
    return (
        <Tab.Navigator
            initialRouteName="Ana Sayfa"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "black",  // Aktif olan sekme rengi siyah
                tabBarInactiveTintColor: "#959595",  // İnaktif olan sekme rengi gri
                headerShown: false,
                tabBarStyle: {
                    height: 80,
                },
            }}
        >
            <Tab.Screen
                name="Ana Sayfa"
                component={homeNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                    tabBarLabel: 'Ana Sayfa',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginBottom: 10,
                    },
                }}
            />
            <Tab.Screen
                name="Arama"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                    tabBarLabel: 'Arama',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginBottom: 10,
                    },
                }}
            />
            <Tab.Screen
                name="Kütüphanem"
                component={MyLibrary}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="library-outline" size={size} color={color} />
                    ),
                    tabBarLabel: 'Kütüphanem',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginBottom: 10,
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" size={size} color={color} />
                    ),
                    tabBarLabel: 'Profil',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginBottom: 10,
                    },
                }}
            />

        </Tab.Navigator>
    );
}

export default Main;
