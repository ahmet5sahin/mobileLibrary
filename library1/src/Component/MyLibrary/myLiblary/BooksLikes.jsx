import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get("window");

function BooksLikes() {
    const navigation = useNavigation();
    const [books, setBooks] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        const fetchLikedBooks = async () => {
            try {
                const storedLikedBooks = JSON.parse(await AsyncStorage.getItem('likedBooks')) || [];
                setLikedBooks(storedLikedBooks);
            } catch (error) {
                console.error('Error fetching liked books: ', error);
            }
        };

        fetchBooks();
        fetchLikedBooks();
    }, []);

    const likedBooksData = books.filter(book => likedBooks.includes(book.id));

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Kitap Detay", { bookId: item.id })}
            style={{ flexDirection: "row", alignItems: 'center', paddingHorizontal: 12 }}>
            <Image
                style={{ width: width * 0.33, height: width * 0.45, marginBottom: 13, marginTop: 13, borderRadius: 12 }}
                source={{ uri: item.imageUrl }}
            />
            <View style={{ paddingHorizontal: 29 }}>
                <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 8, paddingHorizontal: 18, paddingVertical: 5 }}>{item.title}</Text>
                <Text style={{ fontSize: 18, fontWeight: "500", color: "grey", marginTop: 8, paddingHorizontal: 18, paddingVertical: 5 }}>{item.writer}</Text>
                <Text style={{ fontSize: 14, color: "red", backgroundColor: "#FFE5E6", marginTop: 8, paddingHorizontal: 44, paddingVertical: 4 }}>{item.type}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <View style={{ borderBlockColor: "white", borderTopRightRadius: 44, flex: 1 }}>
                <Image style={{ width: "100%", height: height * 0.30 }} source={require('../../../../assets/myBooks.jpg')} />
                <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
                    <View style={{ backgroundColor: "white", width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 55, position: "absolute", top: -80, borderTopLeftRadius: 30, borderTopEndRadius: 30 }}>
                        <Text style={{ marginTop: 30, marginBottom: 15, fontSize: 24, fontWeight: "bold" }}></Text>
                    </View>
                    <FlatList
                        data={likedBooksData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{ margin: 12 }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default BooksLikes;
