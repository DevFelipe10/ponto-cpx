import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx.example";
import RegistroPonto from "./RegistroPonto.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RegistroPonto />
  </StrictMode>
);
