// src/firebase.js
import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDafoIz1liL1lFAVLqzePdIqpQQwx6DJJE",
    authDomain: "reperos.firebaseapp.com",
    projectId: "reperos",
    storageBucket: "reperos.firebasestorage.app",
    messagingSenderId: "143038037469",
    appId: "1:143038037469:web:dd3cbd7904a212d1aa0a34",
    measurementId: "G-73NZMT8MK9"
};

// Initialize base application module
const app = initializeApp(firebaseConfig);

// Initialize Firestore with high-reliability persistent offline caching mechanical layers
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    })
});