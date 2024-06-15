import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';

const AddAuthor = () => {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthorId, setSelectedAuthorId] = useState(null);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'authors'));
            const authorsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setAuthors(authorsList);
        } catch (error) {
            console.error('Yazarlar alınırken hata:', error);
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

    const uploadFile = async (uri, filePath) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const fileRef = ref(storage, filePath);
        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    };

    const handleSubmit = async () => {
        if (!name || !about || !image) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        try {
            const imageUrl = await uploadFile(image, `authors/${new Date().toISOString()}`);

            if (selectedAuthorId) {
                // Update author
                await updateDoc(doc(db, 'authors', selectedAuthorId), {
                    name,
                    about,
                    imageUrl,
                    timestamp: serverTimestamp()
                });
                Alert.alert('Başarılı', 'Yazar başarıyla güncellendi!');
            } else {
                // Add new author
                await addDoc(collection(db, 'authors'), {
                    name,
                    about,
                    imageUrl,
                    timestamp: serverTimestamp()
                });
                Alert.alert('Başarılı', 'Yazar başarıyla eklendi!');
            }

            // Clear form fields
            clearForm();
            fetchAuthors();
        } catch (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Hata', 'Yazar eklenemedi.');
        }
    };

    const clearForm = () => {
        setName('');
        setAbout('');
        setImage(null);
        setSelectedAuthorId(null);
    };

    const handleAuthorPress = (author) => {
        setSelectedAuthorId(author.id);
        setName(author.name);
        setAbout(author.about);
        setImage(author.imageUrl);
    };

    const handleDelete = async () => {
        if (selectedAuthorId) {
            try {
                await deleteDoc(doc(db, 'authors', selectedAuthorId));
                Alert.alert('Başarılı', 'Yazar başarıyla silindi!');
                clearForm();
                fetchAuthors();
            } catch (error) {
                console.error('Yazar silinirken hata:', error);
                Alert.alert('Hata', 'Yazar silinemedi.');
            }
        }
    };

    const renderAuthorItem = ({ item }) => (
        <TouchableOpacity style={styles.authorItem} onPress={() => handleAuthorPress(item)}>
            <Text style={styles.authorName}>{item.name}</Text>
            <Text style={styles.authorAbout}>{item.about}</Text>
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.listImage} />}
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Yazar İsmi" value={name} onChangeText={setName} />
                <TextInput
                    style={styles.input}
                    placeholder="Hakkında"
                    value={about}
                    onChangeText={setAbout}
                    multiline
                />
                <Button title="Resim Seç" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Button title={selectedAuthorId ? "Yazarı Güncelle" : "Yazar Ekle"} onPress={handleSubmit} />
                {selectedAuthorId && <Button title="Yazarı Sil" onPress={handleDelete} />}
                <FlatList
                    data={authors}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAuthorItem}
                    contentContainerStyle={styles.authorList}
                />
            </View>
        </ScrollView>
    );
};

export default AddAuthor;

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
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 10,
    },
    listImage: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
    },
    authorList: {
        marginTop: 20,
    },
    authorItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 10,
    },
    authorName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    authorAbout: {
        fontSize: 16,
        color: 'gray',
    },
});
