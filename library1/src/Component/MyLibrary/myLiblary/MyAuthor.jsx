import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const MyAuthor = ({ author }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("yazar Detay", { authorId: author.id })}
            style={{ flexDirection: "row", alignItems: 'center', paddingHorizontal: 12 }}>
            <Image
                style={{ width: width * 0.23, height: width * 0.23, marginBottom: 13, marginTop: 13, borderRadius: 55 }}
                source={{ uri: author.imageUrl }}
            />
            <View style={{ paddingHorizontal: 22 }}>
                <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 8, paddingHorizontal: 3, paddingVertical: 5 }}>
                    {author.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default MyAuthor;
