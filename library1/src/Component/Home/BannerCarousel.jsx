import React, { useState } from "react";
import { View, Image, FlatList, StyleSheet, Dimensions, Text } from "react-native";

const { width, height } = Dimensions.get("window");

function BannerCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const banners = [

        { uri: "https://source.unsplash.com/featured/?Reading", text: "Kitaplarla hayal gücünü besle, dünyayı keşfet!" },
        { uri: "https://images.unsplash.com/photo-1512820790803-83ca734da794", text: "Bir kitap, zamanın içinde yolculuk yapmaktır." },
        { uri: "https://source.unsplash.com/featured/?book", text: "Kitaplar dünyayı keşfetmenin anahtarıdır." },


    ];

    const onViewRef = React.useRef((viewableItems) => {
        if (viewableItems.viewableItems.length > 0) {
            setActiveIndex(viewableItems.viewableItems[0].index || 0);
        }
    });

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

    const renderBannerItem = ({ item, index }) => (
        <View style={styles.bannerContainer}>
            <Image
                source={typeof item === 'string' ? { uri: item } : item}
                style={styles.bannerImage}
            />
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={banners}
            renderItem={renderBannerItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            snapToAlignment={"center"}
            decelerationRate={"fast"}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            testID="banner-carousel"
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
}

const styles = StyleSheet.create({
    bannerContainer: {
        width: width * 0.89,
        height: height * 0.24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 18,
    },
    bannerImage: {
        width: width - 40,
        height: height * 0.24,
        resizeMode: "cover",
        borderRadius: 12,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Yumuşak karartma efekti
        borderRadius: 12,
        justifyContent: 'flex-end',
        padding: 10,
    },
    overlayText: {
        color: 'white',
        fontSize: 14,
    },
    separator: {
        width: 10, // Resimler arasında boşluk
    },
});

export default BannerCarousel;
