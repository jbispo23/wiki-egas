// AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import App from "./App";

export default function AppRoutes() {
  return (
    <BrowserRouter basename="/wiki-egas">  {/* 👈 acrescente isto */}
      <nav style={{ display:"flex", gap:12, padding:"10px 16px", borderBottom:"1px solid #e5e7eb", position:"sticky", top:0, background:"#fff", zIndex:10 }}>
        <Link to="/">Home</Link>
        <Link to="/topicos">Cadastro de Tópico</Link>
        <Link to="/calendario">Calendário</Link>
        <Link to="/auditorios">Controlo auditórios</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topicos" element={<App />} />
        {/* ...suas outras rotas se houver */}
      </Routes>
    </BrowserRouter>
  );
}
