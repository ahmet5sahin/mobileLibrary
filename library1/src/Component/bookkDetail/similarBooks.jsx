import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("window");

const SimilarBooks = ({ book }) => {
    const navigation = useNavigation();

    if (!book) {
        return null; // Book undefined ise, bileşen render edilmiyor
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Kitap Detay", { bookId: book.id })}
            style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: width * 0.30,
                marginTop: 52,
                marginLeft: 12,
                height: height * 0.25,
                marginBottom: 70,
                paddingHorizontal: 10
            }}>
            <Image
                style={{ width: width * 0.35, height: width * 0.46, borderRadius: 12, borderWidth: 0.1, borderColor: "grey" }}
                source={{ uri: book.imageUrl }}
            />
            <View style={{ flexDirection: "column", alignItems: 'end', paddingHorizontal: 4, justifyContent: 'center', width: width * 0.35, height: width * 0.24, marginTop: 17 }}>
                <Text style={{ color: "black", fontWeight: '700', fontSize: 14 }}>{book.title}</Text>
                <Text style={{ color: "#5a5a5a", fontWeight: '500', fontSize: 16 }}>{book.writer}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SimilarBooks;
