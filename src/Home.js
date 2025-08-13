// Home.jsx
import React, { useEffect } from "react";

/**
 * Home com 3 atalhos:
 * - Wiki
 * - Calendário
 * - Gestão de Auditórios
 * Troca só os links no array "projects".
 */

export default function Home() {
  useEffect(() => {
    const css = `
      :root{ --bg:#0b1220; --card:#121b2d; --cardHover:#1a2742; --text:#e8eefc; --muted:#a9b4c7; --ring: rgba(59,130,246,.35);}
      .home{min-height:100vh; padding:48px 20px; color:var(--text);
        background: radial-gradient(1200px 600px at 10% -10%, #1c2a4a 0%, transparent 60%),
                    radial-gradient(900px 500px at 110% 10%, #1a3a6b 0%, transparent 55%),
                    var(--bg);}
      .box{max-width:1100px;margin:0 auto}
      .title{font-size:1.6rem;font-weight:800;margin-bottom:8px}
      .sub{color:var(--muted);margin-bottom:22px}
      .grid{display:grid;grid-template-columns:repeat(12,1fr);gap:18px}
      @media (max-width:860px){.grid{grid-template-columns:1fr}}
      .card{grid-column:span 4;background:var(--card);border-radius:18px;padding:20px;border:1px solid rgba(255,255,255,.06);
        transition:.18s;cursor:pointer}
      @media (max-width:860px){.card{grid-column:1 / -1}}
      .card:hover{transform:translateY(-3px);background:var(--cardHover);box-shadow:0 12px 30px rgba(0,0,0,.25),0 0 0 6px var(--ring)}
      .kicker{color:var(--muted);text-transform:uppercase;letter-spacing:.08em;font-size:.8rem}
      .card h3{margin:6px 0 6px 0;font-size:1.35rem}
      .desc{color:var(--muted);line-height:1.45}
      .pill{position:absolute;right:14px;top:14px;font-size:.75rem;color:#e5f0ff;background:rgba(59,130,246,.25);
        border:1px solid rgba(59,130,246,.45);padding:6px 10px;border-radius:999px}
    `;
    const el = document.createElement("style");
    el.id = "home-css";
    el.innerHTML = css;
    document.head.appendChild(el);
    return () => document.getElementById("home-css")?.remove();
  }, []);

  // 🔗 Troca aqui pelos teus repositórios
  const projects = [
    { key:"wiki", title:"Wiki", kicker:"Base de conhecimento",
      href:"https://jbispo23.github.io/wiki-egas/",
      desc:"Documentação viva do GSI. Padrões, tutoriais e funções." },
    { key:"cal", title:"Calendário", kicker:"Gestão de equipa",
      href:"https://github.com/sua-org/seu-repo-calendario",
      desc:"Planeamento de férias, Teletrabalhos e pontos." },
    { key:"aud", title:"Controlo de Auditórios", kicker:"Infraestrutura",
      href:"https://github.com/sua-org/seu-repo-auditorios",
      desc:"Reservas, equipamentos e suporte às salas especiais." },
  ];

  const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <main className="home">
      <div className="box">
        <div className="title">Centro de Atalhos • GSI</div>
        <div className="sub">Menu de Navegação</div>

        <section className="grid" aria-label="Atalhos">
          {projects.map((p)=>(
            <article key={p.key} className="card" onClick={()=>open(p.href)} title={`Abrir ${p.title}`}>
              <span className="pill">Git</span>
              <div className="kicker">{p.kicker}</div>
              <h3>{p.title}</h3>
              <p className="desc">{p.desc}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
