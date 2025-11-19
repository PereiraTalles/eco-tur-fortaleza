import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CriarContaPage from "./pages/CriarContaPage";
import HomePage from "./pages/HomePage";
import Settings from "./pages/SettingsPage"; //o nome que eu dei para o arquivo foi SettingsPage.tsx

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
  if (tela === "settings") {
    return <Settings />;
  }

  // quando tela === "home"
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
