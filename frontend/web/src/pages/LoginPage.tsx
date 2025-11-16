import React, { useState } from "react";

type LoginPageProps = {
  onCriarConta: () => void;
  onLoginSuccess: () => void; // ← adicionamos isso
};

const LoginPage: React.FC<LoginPageProps> = ({ onCriarConta, onLoginSuccess }) => {
  // estados opcionais, caso você queira validação básica depois
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    // por enquanto sempre considera login válido
    // futuramente validaremos com o backend
    if (email.trim() !== "" && senha.trim() !== "") {
      onLoginSuccess();
    } else {
      alert("Preencha e-mail e senha.");
    }
  };

  return (
    <div>
      <div className="app-frame">
        <div className="login-card">
          <h1 className="login-title">
            ECO TUR
            <br />
            FORTALEZA
          </h1>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="login-field">
              <label htmlFor="email">E-mail:</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Senha:</label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </form>

          <div className="login-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}      // ← LOGIN FUNCIONA AGORA
            >
              Entrar
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCriarConta}
            >
              Criar Conta
            </button>
          </div>
        </div>
      </div>

      {/* Mantido exatamente como você pediu */}
      <footer className="app-footer">
        © Copyright Eco Fortaleza <br /> Todos os Direitos Reservados
      </footer>
    </div>
  );
};

export default LoginPage;
