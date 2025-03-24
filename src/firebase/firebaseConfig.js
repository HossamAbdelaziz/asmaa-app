import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyAkZlNRYXi3-TDWoLgr_jLFpjzRfeQakC4",
    authDomain: "asmaa-app-2759b.firebaseapp.com",
    projectId: "asmaa-app-2759b",
    storageBucket: "asmaa-app-2759b.firebasestorage.app",
    messagingSenderId: "928363907446",
    appId: "1:928363907446:web:87a0fbec408b9d52575257"
};


// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// ✅ Initialize Firestore (Fixes Your Error)
export const db = getFirestore(app);