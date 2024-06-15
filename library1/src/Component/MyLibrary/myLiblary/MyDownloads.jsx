// MyDownloads.js
import React from 'react';
import { Text, View, Image, Dimensions, ScrollView } from 'react-native';
import MyBook from './MyBook';

const { width, height } = Dimensions.get("window");

function MyDownloads() {
    return (
        <ScrollView>
            <View style={{ borderBlockColor: "white", borderTopRightRadius: 44, flex: 1 }}>
                <Image style={{ width: "100%", height: height * 0.30 }} source={require('../../../../assets/library.jpg')} />
                <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
                    <View style={{ backgroundColor: "white", width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 55, position: "absolute", top: -80, borderTopLeftRadius: 30, borderTopEndRadius: 30 }}>
                        <Text style={{ marginTop: 30, marginBottom: 15, fontSize: 24, fontWeight: "bold" }}></Text>
                    </View>

                    <ScrollView style={{ margin: 12 }}>
                        <MyBook />
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
}

export default MyDownloads;
