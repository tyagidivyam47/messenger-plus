// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqJOziA9ivgRVfBcy2FpMD0PE1kz5mtp8",
  authDomain: "react-messenger-98b45.firebaseapp.com",
  databaseURL: "http://react-messenger-98b45.firebaseio.com",
  projectId: "react-messenger-98b45",
  storageBucket: "react-messenger-98b45.appspot.com",
  messagingSenderId: "68788189960",
  appId: "1:68788189960:web:31311eb55cae11015a8abd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};