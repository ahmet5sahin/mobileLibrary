import React from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, Entypo, AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Librarys from './Librarys';

const { width, height } = Dimensions.get("window");

function MyLibrary() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titleText}>KÜTÜPHANEM</Text>
            <ScrollView
                horizontal
                contentContainerStyle={styles.libraryContainer}
                showsHorizontalScrollIndicator={false}
            >
                <Librarys
                    pres={() => navigation.navigate("Okuma Listem")}
                    name="Okuma Listem"
                    imageSource={require('../../../assets/readList333.png')}
                    backgroundImageSource={require('../../../assets/background.png')}
                    logo={<Feather name="list" size={27} color="black" />}
                />
                <Librarys
                    pres={() => navigation.navigate("Kitaplarım")}
                    name="Kitaplarım"
                    imageSource={require('../../../assets/booksicon22.png')}
                    backgroundImageSource={require('../../../assets/background.png')}
                    logo={<FontAwesome5 name="book-open" size={24} color="black" />}
                />
                <Librarys
                    pres={() => navigation.navigate("Beğendiğim Yazarlar")}
                    name="Beğendiğim Yazarlar"
                    imageSource={require('../../../assets/charles.png')}
                    backgroundImageSource={require('../../../assets/background.png')}
                    logo={<Ionicons name="person-outline" size={24} color="black" />}
                />
                <Librarys
                    pres={() => navigation.navigate("Beğendiğim Kitaplar")}
                    name="Beğendiğim Kitaplar"
                    imageSource={require('../../../assets/begendigim.png')}
                    backgroundImageSource={require('../../../assets/background.png')}
                    logo={<Entypo name="heart-outlined" size={27} color="black" />}
                />
                <Librarys
                    pres={() => navigation.navigate("İndirdiklerim")}
                    name="İndirdiklerim"
                    imageSource={require('../../../assets/booksicon22.png')}
                    backgroundImageSource={require('../../../assets/background.png')}
                    logo={<AntDesign name="clouddownloado" size={27} color="black" />}
                />
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Arka planın opaklığı
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: '#4184bf', // Sarı tonu
        fontSize: 35,
        fontWeight: 'bold',
        textShadowColor: '#000', // Siyah gölge
        textShadowOffset: { width: 1, height: 1 }, // Daha hafif bir gölge
        textShadowRadius: 2,
        marginTop: 70,
        marginBottom: -10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    libraryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
});

export default MyLibrary;
