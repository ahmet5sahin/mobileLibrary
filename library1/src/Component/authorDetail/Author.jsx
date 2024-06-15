import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("window");
const Author = ({ author }) => {
    const navigation = useNavigation();

    const handleAuthorPress = () => {
        navigation.navigate('yazar Detay', { authorId: author.id });
    };

    return (
        <TouchableOpacity onPress={handleAuthorPress} style={styles.container}>
            <View style={styles.authorContainer}>
                <Image style={styles.authorImage} source={{ uri: author.imageUrl }} />
                <Text style={styles.authorName}>{author.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 35,
        marginTop: -24
    },
    authorContainer: {
        flexDirection: "column", alignItems: 'end', paddingHorizontal: 4, justifyContent: 'center', width: width * 0.35, height: width * 0.24
    },
    authorImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    authorName: {
        fontSize: 16,

    },
});

export default Author;
