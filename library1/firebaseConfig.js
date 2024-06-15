// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Firebase Storage'ı ekleyin

const firebaseConfig = {
    apiKey: "AIzaSyBkofpdm8x9OjrvtMhM4X39cG3insvQr00",
    authDomain: "library-8a90b.firebaseapp.com",
    projectId: "library-8a90b",
    storageBucket: "library-8a90b.appspot.com",
    messagingSenderId: "888925485408",
    appId: "1:888925485408:web:641d3757b1dcb96dafc605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);  // Storage referansını oluşturun
export default app;