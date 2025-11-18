import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CriarContaPage from "./pages/CriarContaPage";
import HomePage from "./pages/HomePage";

type TelaAtiva = "login" | "cadastro" | "home";

function App() {
  const [tela, setTela] = useState<TelaAtiva>(() => {
  const salvo = localStorage.getItem("eco_tur_tela");
  if (salvo === "home") {
    return "home";
  }
  return "login";
});

  if (tela === "login") {
    return (
      <LoginPage
        onCriarConta={() => setTela("cadastro")}
        // vamos usar isso no próximo passo
        onLoginSuccess={() => {
          setTela("home");
          localStorage.setItem("eco_tur_tela", "home");
        }}
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
  return (
    <HomePage
      onLogout={() => {
        localStorage.removeItem("eco_tur_tela"); // apaga o login salvo
        setTela("login");                        // volta ao login
      }}
    />
  );
}

export default App;
