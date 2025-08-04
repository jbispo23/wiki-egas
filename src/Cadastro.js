import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Cadastro({ onSalvar }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [fluxo, setFluxo] = useState("");
  const [categoria, setCategoria] = useState("");

  const plataformas = [
    "myAgir", "Digitalis", "MobilidadeNet", "EgasAcademy",
    "Ticket Egas", "myEgas", "PortalEmprego", "Campus Digital", "Job Universia"
  ];

  const fluxos = [
    "Proposta de Tese", "Proposta de Relatório", "Proposta de RSA", "PUC",
    "Trabalho Final", "Avaliação de desempenho", "Gestão de compras EM",
    "Gestão de compras P", "Listagem de material", "Material Clinico",
    "Reuniões", "Relatório anual de desempenho", "outro"
  ];

  const categorias = [
    "Relatório", "Gestão documental", "Fluxo",
    "Acessos", "Funções", "Instruções", "Procedimentos"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao || !plataforma || !fluxo || !categoria) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    await addDoc(collection(db, "topicos"), {
      titulo,
      descricao,
      plataforma,
      fluxo,
      categoria
    });

    setTitulo("");
    setDescricao("");
    setPlataforma("");
    setFluxo("");
    setCategoria("");

    if (onSalvar) onSalvar();
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "20px" }}>Cadastro de Tópico</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" }}
            required
          ></textarea>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <select
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          >
            <option value="">Selecione a plataforma</option>
            {plataformas.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <select
            value={fluxo}
            onChange={(e) => setFluxo(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          >
            <option value="">Selecione o fluxo</option>
            {fluxos.map((f, i) => (
              <option key={i} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#007bff",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Salvar Tópico
        </button>
      </form>
    </div>
  );
}
