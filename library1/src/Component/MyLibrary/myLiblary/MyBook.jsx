import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get("window");

function MyBook() {
    const navigation = useNavigation();
    const [books, setBooks] = useState([]);
    const [downloadedBooks, setDownloadedBooks] = useState([]);

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

        const fetchDownloadedBooks = async () => {
            try {
                const storedDownloadedBooks = JSON.parse(await AsyncStorage.getItem('downloadedBooks')) || [];
                setDownloadedBooks(storedDownloadedBooks);
            } catch (error) {
                console.error('Error fetching downloaded books: ', error);
            }
        };

        fetchBooks();
        fetchDownloadedBooks();
    }, []);

    const downloadedBooksData = books.filter(book => downloadedBooks.some(downloadedBook => downloadedBook.id === book.id));

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
        <FlatList
            data={downloadedBooksData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
}

export default MyBook;
