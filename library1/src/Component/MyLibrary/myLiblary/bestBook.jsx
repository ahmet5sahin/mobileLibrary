// BestBooks.js

import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import SimilarBooks from "../../bookkDetail/similarBooks";
const BestBooks = () => {
    const [bestBooks, setBestBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const ratedBooks = booksData.filter(book => book.rating && book.rating.count > 0);
                const sortedBooks = ratedBooks.sort((a, b) => {
                    const aRating = a.rating.sum / a.rating.count;
                    const bRating = b.rating.sum / b.rating.count;
                    return bRating - aRating;
                });

                setBestBooks(sortedBooks);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchBestBooks();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 27, fontWeight: 'bold', paddingHorizontal: 30 }}>En Çok Puan Alan Kitaplar</Text>
            <FlatList
                style={{ paddingHorizontal: 30, marginTop: 50 }}
                data={bestBooks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 30, marginBottom: 312 }}>{index + 1}.</Text>
                        <SimilarBooks book={item} />
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default BestBooks;
