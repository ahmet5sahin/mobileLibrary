import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, ScrollView, ActivityIndicator, FlatList, Button, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BannerCarousel from './BannerCarousel';
import SimilarBooks from "../bookkDetail/similarBooks";
import Author from '../authorDetail/Author';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get("window");

function Home() {
    const navigation = useNavigation();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([]);
    const [bookCount, setBookCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [topRatedBooks, setTopRatedBooks] = useState([]);
    const [readingGoal, setReadingGoal] = useState(30); // default reading goal in minutes
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const bookData = await fetchBookData();
            setBooks(bookData);
            setBookCount(bookData.length);
            const pages = bookData.reduce((total, book) => total + (book.NumberPages || 0), 0);
            setTotalPages(pages);

            const topRated = await fetchTopRatedBooks();
            setTopRatedBooks(topRated);
        };

        const fetchAuthors = async () => {
            const authorData = await fetchAuthorData();
            const sortedAuthors = sortAuthorsByRating(authorData);
            setAuthors(sortedAuthors);
            setLoading(false);
        };

        fetchBooks();
        fetchAuthors();
    }, []);

    useEffect(() => {
        let interval;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        } else if (!timerRunning && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerRunning]);

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

    const fetchTopRatedBooks = async () => {
        const topRatedData = [];
        try {
            const querySnapshot = await getDocs(collection(db, 'books'));
            const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const ratedBooks = booksData.filter(book => book.rating && book.rating.count > 0);
            const sortedBooks = ratedBooks.sort((a, b) => {
                const aRating = a.rating.sum / a.rating.count;
                const bRating = b.rating.sum / b.rating.count;
                return bRating - aRating;
            });
            return sortedBooks.slice(0, 10);
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const fetchAuthorData = async () => {
        const allAuthors = [];
        try {
            const querySnapshot = await getDocs(collection(db, "authors"));
            querySnapshot.forEach((doc) => {
                allAuthors.push({ ...doc.data(), id: doc.id });
            });
            return allAuthors;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const sortAuthorsByRating = (authors) => {
        return authors.sort((a, b) => {
            const aRating = a.rating ? a.rating.sum / a.rating.count : 0;
            const bRating = b.rating ? b.rating.sum / b.rating.count : 0;
            return bRating - aRating;
        });
    };

    const startTimer = () => {
        setTimerRunning(true);
    };

    const resetTimer = () => {
        setTimer(0);
        setTimerRunning(false);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <ScrollView>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#2980B9',
                justifyContent: 'center',
                marginBottom: 400
            }}>
                {/* Top View */}
                <View style={{
                    width: '100%',
                    height: '11%',
                    justifyContent: 'center',
                }}>
                    <Image
                        style={{ width: "100%", height: height }}
                        source={require('../../../assets/anasayfaDeneme2.jpg')}
                    />
                </View>

                {/* Bottom View */}
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#F4F4F4',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    justifyContent: 'center',
                }}>
                    <View style={{
                        marginTop: 19,
                        flexDirection: "row",
                        alignItems: 'center',
                        height: height * 0.06,
                        width: width * 0.9,
                        backgroundColor: "#DF9C6C",
                        borderRadius: 14,
                        paddingHorizontal: 14,
                        marginBottom: 23,
                        marginLeft: 20,
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {/* <SimpleLineIcons
                            style={{ position: 'absolute', left: 12 }}
                            name="book-open"
                            size={13}
                            color="white"
                        /> */}
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                textAlign: 'center',
                                flex: 1
                            }}
                        >
                            İçeride toplam {3 * bookCount} kitap ve {3 * totalPages} sayfa var!
                        </Text>
                    </View>

                    <BannerCarousel />

                    <View style={{ marginBottom: 35, marginLeft: 12, marginTop: -734, marginHorizontal: 2 }}>
                        <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 20 }}>Yeni Eklenen Kitaplar</Text>
                        <FlatList
                            horizontal
                            data={books}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{ marginRight: 20, marginLeft: 10, marginTop: 50 }}>
                                    <SimilarBooks book={item} />
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <View style={{ marginBottom: 15, marginLeft: 17, marginTop: 2 }}>
                        <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 30 }}>En Sevilen Kitaplar</Text>
                        <FlatList
                            horizontal
                            data={topRatedBooks}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{ marginRight: 20, marginLeft: 10, marginTop: 50, }}>
                                    <SimilarBooks book={item} />
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* Yazarların Listesi */}
                    <View style={{ marginBottom: 2, marginLeft: 17, marginTop: 2 }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Favori Yazarlar</Text>
                        <FlatList
                            horizontal
                            data={authors}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{ marginRight: 10, marginLeft: 10, marginTop: 90, marginBottom: 65 }}>
                                    <Author author={item} />
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <View style={{ padding: 20, backgroundColor: '#524b80', borderRadius: 19, marginHorizontal: 12, marginBottom: 3333 }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: "white" }}>Günlük Okuma Süresi Hedefi</Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={10}
                            maximumValue={240}
                            step={10}
                            onValueChange={(value) => setReadingGoal(value)}
                            value={readingGoal}
                            minimumTrackTintColor="#1EB1FC"
                            maximumTrackTintColor="#8ED1FC"
                        />
                        <Text style={{ fontSize: 16, color: "white" }}>Seçilen Süre: {readingGoal} dakika</Text>
                        <TouchableOpacity
                            onPress={startTimer}
                            style={{
                                backgroundColor: 'white',
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 10,
                                borderRadius: 19,
                            }}
                        >
                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 16, }}>Başla</Text>
                        </TouchableOpacity>
                        {timerRunning && (
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 16 }}>Geçen Süre: {Math.floor(timer / 60)} dakika {timer % 60} saniye</Text>
                                <Button title="Sıfırla" onPress={resetTimer} />
                            </View>
                        )}
                    </View>

                </View>

            </View>



            {/* Yazar ve Kitap Ekle Butonları */}
            <Button title="Yazar Ekle" onPress={() => navigation.navigate('yazar ekle item', { authorId: 'desired-author-id' })} />
            <Button title="Kitap Ekle" onPress={() => navigation.navigate('Kitap Ekle2')} />
            <Button title="Kitap Listesi" onPress={() => navigation.navigate('Kitap liste')} />
        </ScrollView>
    );
}

export default Home;
