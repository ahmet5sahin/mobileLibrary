import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';

const AddBook2 = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [publisher, setPublisher] = useState('');
    const [type, setType] = useState('');
    const [content, setContent] = useState('');
    const [isbn, setIsbn] = useState('');
    const [numberPages, setNumberPages] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [pdfName, setPdfName] = useState('');
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'books'));
            const booksList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setBooks(booksList);
        } catch (error) {
            console.error('Kitaplar alınırken hata:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    const pickPdf = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
                copyToCacheDirectory: true,
            });

            console.log('DocumentPicker result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const { uri, name } = result.assets[0];
                console.log('PDF URI:', uri);
                setPdf({ uri, name });
                setPdfName(name);
            } else {
                console.log('PDF seçimi iptal edildi veya hata oluştu');
            }
        } catch (error) {
            console.error('PDF seçimi sırasında hata:', error);
        }
    };

    const uploadFile = async (uri, filePath) => {
        try {
            if (uri.startsWith('content://')) {
                const fileInfo = await FileSystem.getInfoAsync(uri);
                if (!fileInfo.exists) {
                    throw new Error('Dosya mevcut değil');
                }
                const fileUri = FileSystem.documentDirectory + filePath;
                await FileSystem.copyAsync({ from: uri, to: fileUri });
                uri = fileUri;
            }

            const response = await fetch(uri);
            const blob = await response.blob();
            const fileRef = ref(storage, filePath);
            await uploadBytes(fileRef, blob);
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        } catch (error) {
            console.error('Dosya yüklenirken hata:', error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        if (!title || !writer || !publisher || !type || !content || !isbn || !numberPages || !releaseDate || !image || !pdf) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        try {
            const imageUrl = await uploadFile(image, `images/${new Date().toISOString()}.jpg`);
            const pdfUrl = await uploadFile(pdf.uri, `pdfs/${new Date().toISOString()}.pdf`);

            if (selectedBookId) {
                // Update book
                await updateDoc(doc(db, 'books', selectedBookId), {
                    title,
                    writer,
                    publisher,
                    type,
                    content,
                    ISBN: isbn,
                    NumberPages: parseInt(numberPages, 10),
                    releaseDate: parseInt(releaseDate, 10),
                    imageUrl,
                    pdfUrl,
                });
                Alert.alert('Başarılı', 'Kitap başarıyla güncellendi!');
            } else {
                // Add new book
                await addDoc(collection(db, 'books'), {
                    title,
                    writer,
                    publisher,
                    type,
                    content,
                    ISBN: isbn,
                    NumberPages: parseInt(numberPages, 10),
                    releaseDate: parseInt(releaseDate, 10),
                    imageUrl,
                    pdfUrl,
                });
                Alert.alert('Başarılı', 'Kitap başarıyla eklendi!');
            }

            // Clear form fields
            clearForm();
            fetchBooks();
        } catch (error) {
            console.error('Belge eklenirken veya güncellenirken hata:', error);
            Alert.alert('Hata', 'Kitap eklenemedi veya güncellenemedi.');
        }
    };

    const clearForm = () => {
        setTitle('');
        setWriter('');
        setPublisher('');
        setType('');
        setContent('');
        setIsbn('');
        setNumberPages('');
        setReleaseDate('');
        setImage(null);
        setPdf(null);
        setPdfName('');
        setSelectedBookId(null);
    };

    const handleBookPress = (book) => {
        setSelectedBookId(book.id);
        setTitle(book.title);
        setWriter(book.writer);
        setPublisher(book.publisher);
        setType(book.type);
        setContent(book.content);
        setIsbn(book.ISBN);
        setNumberPages(book.NumberPages.toString());
        setReleaseDate(book.releaseDate.toString());
        setImage(book.imageUrl);
        setPdf({ uri: book.pdfUrl, name: book.pdfName });
        setPdfName(book.pdfName);
    };

    const handleDelete = async () => {
        if (selectedBookId) {
            try {
                await deleteDoc(doc(db, 'books', selectedBookId));
                Alert.alert('Başarılı', 'Kitap başarıyla silindi!');
                clearForm();
                fetchBooks();
            } catch (error) {
                console.error('Kitap silinirken hata:', error);
                Alert.alert('Hata', 'Kitap silinemedi.');
            }
        }
    };

    const renderBookItem = ({ item }) => (
        <TouchableOpacity style={styles.bookItem} onPress={() => handleBookPress(item)}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookWriter}>{item.writer}</Text>
        </TouchableOpacity>
    );

    const handleViewPdf = () => {
        if (pdf) {
            navigation.navigate('PdfViewer', { pdfUrl: pdf.uri });
        } else {
            Alert.alert('Hata', 'PDF dosyası bulunamadı.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Kitap İsmi" value={title} onChangeText={setTitle} />
                <TextInput style={styles.input} placeholder="Yazar" value={writer} onChangeText={setWriter} />
                <TextInput style={styles.input} placeholder="Yayınevi" value={publisher} onChangeText={setPublisher} />
                <TextInput style={styles.input} placeholder="Tür" value={type} onChangeText={setType} />
                <TextInput style={styles.input} placeholder="İçerik" value={content} onChangeText={setContent} />
                <TextInput style={styles.input} placeholder="ISBN" value={isbn} onChangeText={setIsbn} />
                <TextInput style={styles.input} placeholder="Sayfa Sayısı" keyboardType="numeric" value={numberPages} onChangeText={setNumberPages} />
                <TextInput style={styles.input} placeholder="Yayın Tarihi" keyboardType="numeric" value={releaseDate} onChangeText={setReleaseDate} />
                <Button title="Resim Seç" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Button title="PDF Seç" onPress={pickPdf} />
                {pdf && <Text>PDF Seçildi: {pdfName}</Text>}
                <Button title={selectedBookId ? "Kitap Güncelle" : "Kitap Ekle"} onPress={handleSubmit} />
                {selectedBookId && <Button title="Kitap Sil" onPress={handleDelete} />}
                {pdf && <Button title="PDF Görüntüle" onPress={handleViewPdf} />}
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    renderItem={renderBookItem}
                    contentContainerStyle={styles.bookList}
                />
            </View>
        </ScrollView>
    );
};

export default AddBook2;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    image: {
        width: 150,
        height: 150,
        marginTop: 10,
        marginBottom: 10,
    },
    bookList: {
        marginTop: 20,
    },
    bookItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 10,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookWriter: {
        fontSize: 16,
        color: 'gray',
    },
});
