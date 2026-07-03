// =========================
// STAR Chat - Firebase
// =========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {

    apiKey: "AIzaSyCEuOcQIvg-chEXfwHM8JAxFeYGpaOIoP4",

    authDomain: "star-social-bdfb2.firebaseapp.com",

    projectId: "star-social-bdfb2",

    storageBucket: "star-social-bdfb2.firebasestorage.app",

    messagingSenderId: "256449419301",

    appId: "1:256449419301:web:970b4905d6beb86c4087cc",

    measurementId: "G-JYT3F33K7Y"

};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);

// الخدمات
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
