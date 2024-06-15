import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Slider from '@react-native-community/slider';
const bestAuther = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'authors'));
                const authorsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sıralama işlemi
                const sortedAuthors = authorsData.sort((a, b) => {
                    const aRating = a.rating ? a.rating.sum / a.rating.count : 0;
                    const bRating = b.rating ? b.rating.sum / b.rating.count : 0;
                    return bRating - aRating;
                });
                setAuthors(sortedAuthors);
            } catch (error) {
                console.error('Error fetching authors: ', error);
            }
        };

        fetchAuthors();
    }, []);

    const renderItem = ({ item }) => {
        const rating = item.rating ? (item.rating.sum / item.rating.count).toFixed(1) : '---';

        return (
            <View style={styles.authorContainer}>
                <Image
                    style={styles.authorImage}
                    source={{ uri: item.imageUrl }}
                />
                <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{item.name}</Text>
                    <Text style={styles.authorRating}>puan: {rating}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>En Çok Puan Alan Yazarlar</Text>
            <FlatList
                data={authors}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 21
    },
    authorContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10
    },
    authorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    authorInfo: {
        justifyContent: 'center',
    },
    authorName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    authorRating: {
        fontSize: 16,
        color: 'gray',
    },
});

export default bestAuther;
