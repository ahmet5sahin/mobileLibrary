import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../../../firebaseConfig'; // Firebase konfigürasyonunu içeren dosyayı import edin

const PdfPage = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storage = getStorage(db);
        const fileRef = ref(storage, 'bulut_vize.pdf'); // PDF dosyasının yolunu buraya girin

        // Firebase Storage'dan PDF dosyasını indir
        getDownloadURL(fileRef)
            .then((url) => {
                setPdfUrl(url); // İndirilen dosyanın URL'sini ayarla
                setLoading(false); // Yükleme tamamlandı, loading state'ini false yap
            })
            .catch((error) => {
                console.error('Dosya indirme hatası:', error);
                setLoading(false); // Hata durumunda da loading state'ini false yap
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {pdfUrl && (
                <WebView
                    source={{ uri: pdfUrl }}
                    style={styles.webview}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webview: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PdfPage;
