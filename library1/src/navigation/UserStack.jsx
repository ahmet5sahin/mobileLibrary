import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
const Stack = createStackNavigator();
import { createStackNavigator } from '@react-navigation/stack';
import RotNavigator from "../navigators/RootNavigation"

const UserStack = () => {
    return (
        <RotNavigator />
    )
}

export default UserStack

const styles = StyleSheet.create({})