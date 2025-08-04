// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔐 Configuração do Firebase (base-conhecimento-84233)
const firebaseConfig = {
  apiKey: "AIzaSyCftyTGb1hmauonZTQu-LOKxRcS3qa_wfI",
  authDomain: "base-conhecimento-84233.firebaseapp.com",
  projectId: "base-conhecimento-84233",
  storageBucket: "base-conhecimento-84233.appspot.com", // Corrigido: .app ➜ .com
  messagingSenderId: "997001693348",
  appId: "1:997001693348:web:c0c490481499ca785ebe31"
};

// 🚀 Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// 🔗 Conexão com o Firestore
const db = getFirestore(app);

// 🔁 Exporta o banco para usar nos componentes
export { db };
