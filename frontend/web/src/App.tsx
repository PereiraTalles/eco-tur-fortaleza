import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CriarContaPage from "./pages/CriarContaPage";
import HomePage from "./pages/HomePage";
import Settings from "./pages/SettingsPage";

type TelaAtiva = "login" | "cadastro" | "home" | "settings";

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
      />
    );
  }

  if (tela === "settings") {
    return (
      <Settings
        onBackHome={() => setTela("home")}
        onLogout={() => {
          localStorage.removeItem("eco_tur_tela");
          setTela("login");
        }}
      />
    );
  }

  return (
    <HomePage
      onLogout={() => {
        localStorage.removeItem("eco_tur_tela");
        setTela("login");
      }}
      onSettings={() => {
        setTela("settings");
      }}
    />
  );
}

export default App;
