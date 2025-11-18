import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA9aYZyF7JTkbjC6Q7tMovXpcqLenvMNA",
  authDomain: "giardino-8fbb7.firebaseapp.com",
  projectId: "giardino-8fbb7",
  storageBucket: "giardino-8fbb7.firebasestorage.app",
  messagingSenderId: "590384317762",
  appId: "1:590384317762:web:423fc160305a587d0534db",
  measurementId: "G-FHJ10R52NL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);