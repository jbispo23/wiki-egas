// AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import App from "./App";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* navegação mínima — opcional, mas útil */}
      <nav style={{
        display:"flex", gap:20, padding:"15px 21px",
        borderBottom:"15px solid #9713c0ff", position:"sticky", top:0,
        background:"#f4f4f9ff", zIndex:10
      }}>
        <Link to="/">Home</Link>
        <Link to="/">Cadastro de Tópico</Link>
        <Link to="/">Calendário</Link>
        <Link to="/">Controlo auditórios</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
