import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const querySnapshot = await getDocs(collection(db, 'books'));
            const booksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBooks(booksList);
        };

        fetchBooks();
    }, []);

    const openPdf = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <Text style={styles.bookTitle}>{item.title}</Text>
                        <TouchableOpacity onPress={() => openPdf(item.pdfUrl)}>
                            <Text style={styles.pdfLink}>PDF'yi Aç</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default BookList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    bookItem: {
        marginBottom: 20,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pdfLink: {
        color: 'blue',
        marginTop: 5,
    },
});
