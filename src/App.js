import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import './App.css';
import Home from "./Home";

const plataformasFixas = [
  'myAgir', 'Digitalis', 'MobilidadeNet', 'EgasAcademy', 'Ticket Egas',
  'myEgas', 'PortalEmprego', 'Campus Digital', 'Job Universia'
];

const fluxosFixos = [
  'Proposta de Tese', 'Proposta de Relatório', 'Proposta de RSA', 'PUC',
  'Trabalho Final', 'Avaliação de desempenho', 'Gestão de compras EM',
  'Gestão de compras P', 'Listagem de material', 'Material Clinico',
  'Reuniões', 'Relatório anual de desempenho', 'outro'
];

const categoriasFixas = [
  'Relatório', 'Gestão documental', 'Fluxo', 'Acessos',
  'Funções', 'Instruções', 'Procedimentos'
];

function App() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [fluxo, setFluxo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [topicos, setTopicos] = useState([]);
  const [busca, setBusca] = useState('');
  const [editando, setEditando] = useState(null);

  const topicosRef = collection(db, 'topicos');

  useEffect(() => {
    async function fetchData() {
      const data = await getDocs(topicosRef);
      setTopicos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    fetchData();
  }, []);

  const salvarTopico = async () => {
    if (!titulo || !descricao || !plataforma || !fluxo || !categoria) return;

    const novoTopico = { titulo, descricao, plataforma, fluxo, categoria };

    if (editando) {
      await updateDoc(doc(db, 'topicos', editando), novoTopico);
      setEditando(null);
    } else {
      await addDoc(topicosRef, novoTopico);
    }

    setTitulo('');
    setDescricao('');
    setPlataforma('');
    setFluxo('');
    setCategoria('');

    const data = await getDocs(topicosRef);
    setTopicos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const editarTopico = (topico) => {
    setEditando(topico.id);
    setTitulo(topico.titulo);
    setDescricao(topico.descricao);
    setPlataforma(topico.plataforma);
    setFluxo(topico.fluxo);
    setCategoria(topico.categoria);
  };

  const apagarTopico = async (id) => {
    await deleteDoc(doc(db, 'topicos', id));
    setTopicos(topicos.filter(t => t.id !== id));
  };

  const topicosFiltrados = topicos.filter((t) =>
    t.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    t.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    t.plataforma.toLowerCase().includes(busca.toLowerCase()) ||
    t.fluxo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', padding: '2rem', gap: '2rem' }}>
      {/* Cadastro */}
      <div style={{ flex: 1 }}>
        <h2>Cadastro de Tópico GSI</h2>
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />

        <select value={plataforma} onChange={e => setPlataforma(e.target.value)}>
          <option value="">Selecione a plataforma</option>
          {plataformasFixas.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>

        <select value={fluxo} onChange={e => setFluxo(e.target.value)}>
          <option value="">Selecione o fluxo</option>
          {fluxosFixos.map((f, i) => <option key={i} value={f}>{f}</option>)}
        </select>

        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="">Selecione a categoria</option>
          {categoriasFixas.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>

        <button onClick={salvarTopico} style={{ marginTop: '10px' }}>
          {editando ? 'Atualizar Tópico' : 'Salvar Tópico'}
        </button>
      </div>

      {/* Lista de Tópicos */}
      <div style={{ flex: 1 }}>
        <h2>📄 Tópicos Cadastrados - GSI </h2>
        <input
          placeholder="Pesquisar por título, descrição, fluxo ou fornecedor"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        {topicosFiltrados.map(topico => (
          <div key={topico.id} style={{ margin: '1rem 0', padding: '1rem', background: '#f0f0f0' }}>
            <strong>{topico.titulo}</strong>
            <p>{topico.descricao}</p>
            <p><b>Plataforma:</b> {topico.plataforma}</p>
            <p><b>Fluxo:</b> {topico.fluxo}</p>
            <p><b>Categoria:</b> {topico.categoria}</p>
            <button onClick={() => editarTopico(topico)}>✏️ Editar</button>
            <button onClick={() => apagarTopico(topico.id)}>🗑️ Apagar</button>
          </div>
        ))}

      </div>
    </div>
    );
}

export default App;
