// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYcqUkH9VTJT2SPqsgq63HRYpXLfO45So",
  authDomain: "ciids-cloud.firebaseapp.com",
  projectId: "ciids-cloud",
  storageBucket: "ciids-cloud.firebasestorage.app",
  messagingSenderId: "558159968772",
  appId: "1:558159968772:web:ea91d1e2ff33e7cf711351",
  measurementId: "G-XZ7Z58TG1D",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
