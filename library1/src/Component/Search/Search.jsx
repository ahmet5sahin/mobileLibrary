import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import SimilarBooks from "../bookkDetail/similarBooks";
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const { width, height } = Dimensions.get("window");

function Search() {
    const [searchText, setSearchText] = useState('');
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await fetchBookData();
            setBooks(data);
            setFilteredBooks(data);
            setLoading(false);
        };

        fetchBooks();
    }, []);

    const fetchBookData = async () => {
        const allData = [];

        try {
            const querySnapshot = await getDocs(collection(db, "books"));
            querySnapshot.forEach((doc) => {
                allData.push({ ...doc.data(), id: doc.id });
            });
            return allData;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const handleSearch = () => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchText.toLowerCase()) ||
            book.writer.toLowerCase().includes(searchText.toLowerCase()) ||
            book.publisher.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    useEffect(() => {
        if (searchText === '') {
            setFilteredBooks(books);
        }
    }, [searchText, books]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView>
            <View style={{ borderBlockColor: "white", borderTopRightRadius: 44, flex: 1 }}>
                <Image style={{ width: "100%", height: height * 0.30 }} source={require('../../../assets/search2.jpg')} />
                <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
                    <View style={{ backgroundColor: "white", width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 55, position: "absolute", top: -80, borderTopLeftRadius: 30, borderTopEndRadius: 30, }}>
                        <Text style={{ marginTop: 40, marginBottom: 15 }}></Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 16, position: "absolute", top: -200, borderTopLeftRadius: 40, borderTopEndRadius: 40, }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.6)', // Şeffaflık için rgba() kullanılır
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            shadowColor: '#000', // Gölgelendirme için shadowColor
                            shadowOffset: { width: 0, height: 2 }, // Gölgelendirme için shadowOffset
                            shadowOpacity: 0.25, // Gölgelendirme için shadowOpacity
                            shadowRadius: 3, // Gölgelendirme için shadowRadius
                            elevation: 9, // Android için gölgelendirme
                        }}>
                            <Ionicons name="search" size={24} color="black" style={{ marginRight: 8 }} />
                            <TextInput
                                style={{ flex: 1, height: 55, marginLeft: 8, fontSize: 19, color: '#333' }}
                                placeholder="Kitap, yazar, yayınevi..."
                                placeholderTextColor="black"
                                onChangeText={text => setSearchText(text)}
                                value={searchText}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <TouchableOpacity onPress={handleSearch} style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 8, padding: 8, marginLeft: 6, height: 55, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name="arrow-forward" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Kitap Öneri")} style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 8, padding: 8, marginLeft: 6, height: 55, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <AntDesign name="wechat" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Text style={{
                        fontSize: 25, fontWeight: '500', paddingHorizontal: 14, marginBottom: 25
                    }}>Tüm Kitaplar</Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 30, justifyContent: 'space-between', marginTop: 20 }}>
                        {filteredBooks.map((book, index) => (
                            <SimilarBooks key={index} book={book} />
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Search;