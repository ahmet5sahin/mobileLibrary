import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfViewer = ({ route }) => {
    const { pdfUrl } = route.params;
    const googleDocsViewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

    return (
        <View style={styles.container}>
            <WebView
                style={{ flex: 1 }}
                source={{ uri: googleDocsViewer }}
                scalesPageToFit={true}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator color='black' size='large' />
                )}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    );
};

export default PdfViewer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});