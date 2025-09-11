// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
    getFirestore, collection, onSnapshot, addDoc, 
    updateDoc, doc, serverTimestamp, query, deleteDoc
} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsWUEOB-tqJJoeIDTfVsT57Ir1x6JtQUY",
  authDomain: "hotel-la-glorieta.firebaseapp.com",
  projectId: "hotel-la-glorieta",
  storageBucket: "hotel-la-glorieta.firebasestorage.app",
  messagingSenderId: "491590352548",
  appId: "1:491590352548:web:57f8836900cdb70508b031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const appId = firebaseConfig.projectId; // Usamos el projectId como ID de la app

export const db = getFirestore(app);
export const auth = getAuth(app);

// Exportamos las funciones para usarlas en los componentes
export {
    onAuthStateChanged, signInAnonymously, collection, onSnapshot,
    addDoc, updateDoc, doc, serverTimestamp, query, deleteDoc
};