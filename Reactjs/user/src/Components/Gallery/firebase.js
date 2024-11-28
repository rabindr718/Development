// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // Import Realtime Database functions
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDqS_tBj18q6cR6C0qbIL0yyQ7RovcZMfA",
  authDomain: "own-gallery-images.firebaseapp.com",
  databaseURL: "https://own-gallery-images-default-rtdb.firebaseio.com",
  projectId: "own-gallery-images",
  storageBucket: "own-gallery-images.appspot.com",
  messagingSenderId: "601019602142",
  appId: "1:601019602142:web:1618df6bee03615b661e4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDbStore = getStorage(app); // For Firebase Storage
export const firebaseDb = getDatabase(app); // For Realtime Database
export const textDataStore = getFirestore(app);
