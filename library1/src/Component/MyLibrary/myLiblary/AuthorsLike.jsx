import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAuthor from './MyAuthor'; // MyAuthor bileşenini içe aktar

const { width, height } = Dimensions.get("window");

function AuthorsLike() {
    const [authors, setAuthors] = useState([]);
    const [likedAuthors, setLikedAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const querySnapshot = await getDocs(collection(db, 'authors'));
            const authorsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAuthors(authorsData);
        };

        const fetchLikedAuthors = async () => {
            try {
                const storedLikedAuthors = JSON.parse(await AsyncStorage.getItem('likedAuthors')) || [];
                setLikedAuthors(storedLikedAuthors);
            } catch (error) {
                console.error('Error fetching liked authors: ', error);
            }
        };

        fetchAuthors();
        fetchLikedAuthors();
    }, []);

    const likedAuthorsData = authors.filter(author => likedAuthors.includes(author.id));

    return (
        <ScrollView>
            <View style={{ borderBlockColor: "white", borderTopRightRadius: 44, flex: 1 }}>
                <Image style={{ width: "100%", height: height * 0.30 }} source={require('../../../../assets/myBooks4.jpg')} />
                <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
                    <View style={{ backgroundColor: "white", width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 55, position: "absolute", top: -80, borderTopLeftRadius: 30, borderTopEndRadius: 30 }}>
                        <Text style={{ marginTop: 30, marginBottom: 15, fontSize: 24, fontWeight: "bold" }}></Text>
                    </View>
                    <ScrollView style={{ margin: 12, marginTop: 15 }}>
                        {likedAuthorsData.map(author => (
                            <MyAuthor key={author.id} author={author} />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
}

export default AuthorsLike;
