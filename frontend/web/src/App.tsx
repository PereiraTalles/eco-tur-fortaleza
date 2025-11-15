import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CriarContaPage from "./pages/CriarContaPage";

type TelaAtiva = "login" | "cadastro";

function App() {
  const [tela, setTela] = useState<TelaAtiva>("login");

  if (tela === "login") {
    return <LoginPage onCriarConta={() => setTela("cadastro")} />;
  }

  return <CriarContaPage onVoltarLogin={() => setTela("login")} />;
}

export default App;
