import React from "react";

type LoginPageProps = {
  onCriarConta: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onCriarConta }) => {
  return (
    <div>
        <div className="app-frame">
      <div className="login-card">
        <h1 className="login-title">
          ECO TUR
          <br />
          FORTALEZA
        </h1>

        <form className="login-form">
          <div className="login-field">
            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>
        </form>

        <div className="login-actions">
          <button type="button" className="btn btn-primary">
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
    <footer className="app-footer">
        © Copyright Eco Fortaleza <br/> Todos os Direitos Reservados
      </footer>
    </div>
  );
};

export default LoginPage;
