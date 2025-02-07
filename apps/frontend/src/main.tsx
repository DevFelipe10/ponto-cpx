import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroPontoAdmin from "./RegistroPontoAdmin";
import AdicionarFaces from "./pages/registro-ponto/AdicionarFaces";
import RegistroPonto from "./pages/registro-ponto/RegistroPonto";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RegistroPonto />} />
        <Route path="/admin" element={<RegistroPontoAdmin />} />
        <Route path="/adicionarfaces" element={<AdicionarFaces />} />
      </Routes>
    </Router>
  </StrictMode>
);
