// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBajQyiDKpwwMjfxsZAF8tFsS7P1DAlLcs",
  authDomain: "our-gallery-9f6bc.firebaseapp.com",
  projectId: "our-gallery-9f6bc",
  storageBucket: "our-gallery-9f6bc.firebasestorage.app",
  messagingSenderId: "869685506175",
  appId: "1:869685506175:web:370bd094709da3d665cf4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
