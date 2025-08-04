// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 👈 Adiciona isso

const firebaseConfig = {
  apiKey: "AIzaSyCftyTGb1hmauonZTQu-LOKxRcS3qa_wfI",
  authDomain: "base-conhecimento-84233.firebaseapp.com",
  projectId: "base-conhecimento-84233",
  storageBucket: "base-conhecimento-84233.firebasestorage.app",
  messagingSenderId: "997001693348",
  appId: "1:997001693348:web:c0c490481499ca785ebe31"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 👈 Exporta o Firestore

export { db };
