import React, { useState } from "react";
import { loginUsuario } from "../services/api";

type LoginPageProps = {
  onCriarConta: () => void;
  onLoginSuccess: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onCriarConta, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

const handleLogin = async () => {
  if (!email || !senha) {
    setErro("Preencha e-mail e senha.");
    return;
  }

  try {
    setCarregando(true);
    setErro(null);

    // pega o usuário que vem do backend
    const resp = await loginUsuario({ email, senha });
    const user = resp.user;

    // salva o usuário no localStorage para as Configurações usarem depois
    localStorage.setItem("eco_tur_user", JSON.stringify(user));

    onLoginSuccess();
  } catch (e: any) {
    console.error(e);
    setErro(
      e?.message || "Não foi possível fazer login. Tente novamente."
    );
  } finally {
    setCarregando(false);
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

          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
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

            {erro && (
              <p
                style={{
                  color: "#b00020",
                  marginTop: "8px",
                  fontSize: "0.9rem",
                }}
              >
                {erro}
              </p>
            )}

            <div className="login-actions" style={{ marginTop: "24px" }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCriarConta}
                disabled={carregando}
              >
                Criar Conta
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="app-footer">
        © Copyright Eco Fortaleza <br /> Todos os Direitos Reservados
      </footer>
    </div>
  );
};

export default LoginPage;
