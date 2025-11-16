import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CriarContaPage from "./pages/CriarContaPage";
import HomePage from "./pages/HomePage";

type TelaAtiva = "login" | "cadastro" | "home";

function App() {
  const [tela, setTela] = useState<TelaAtiva>("login");

  if (tela === "login") {
    return (
      <LoginPage
        onCriarConta={() => setTela("cadastro")}
        // vamos usar isso no próximo passo
        onLoginSuccess={() => setTela("home")}
      />
    );
  }

  if (tela === "cadastro") {
    return (
      <CriarContaPage
        onVoltarLogin={() => setTela("login")}
        // mais pra frente podemos mandar pra home aqui também
        // onSignupSuccess={() => setTela("home")}
      />
    );
  }

  // quando tela === "home"
  return <HomePage />;
}

export default App;
