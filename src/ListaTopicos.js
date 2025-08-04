import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function ListaTopicos({ atualizar }) {
  const [topicos, setTopicos] = useState([]);

  const carregarTopicos = async () => {
    const querySnapshot = await getDocs(collection(db, "topicos"));
    const lista = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setTopicos(lista);
  };

  useEffect(() => {
    carregarTopicos();
  }, [atualizar]);

  const removerTopico = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este tópico?")) {
      await deleteDoc(doc(db, "topicos", id));
      carregarTopicos();
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {topicos.map((topico) => (
        <div
          key={topico.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            background: "#f9f9f9",
            padding: "15px",
            margin: "10px",
            width: "300px",
            boxShadow: "2px 2px 8px #ddd"
          }}
        >
          <h3>{topico.titulo}</h3>
          <p><strong>Descrição:</strong> {topico.descricao}</p>
          <p><strong>Fornecedor:</strong> {topico.fornecedor}</p>
          <p><strong>Fluxo:</strong> {topico.fluxo}</p>
          <button onClick={() => removerTopico(topico.id)}>🗑 Excluir</button>
        </div>
      ))}
    </div>
  );
}
