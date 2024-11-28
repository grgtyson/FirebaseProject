import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcWan3-I6SyzusbFpXjkywI_jLHUlEb68",
  authDomain: "testime-andmebaasi-tegemist.firebaseapp.com",
  projectId: "testime-andmebaasi-tegemist",
  storageBucket: "testime-andmebaasi-tegemist.firebasestorage.app",
  messagingSenderId: "10142571927",
  appId: "1:10142571927:web:61279b709d5b83ac27b8d2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
