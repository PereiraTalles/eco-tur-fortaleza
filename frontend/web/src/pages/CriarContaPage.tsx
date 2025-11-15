import React from "react";

type CriarContaPageProps = {
  onVoltarLogin: () => void;
};

const CriarContaPage: React.FC<CriarContaPageProps> = ({ onVoltarLogin }) => {
  return (
    <div>
        <div className="app-frame">
            <div className="login-card">
            <h1 className="login-title">
            ECO TUR
            <br />
            FORTALEZA
            </h1>

        <form className="signup-form">
          <div className="signup-grid">
            {/* linha 1 */}
            <div className="login-field">
              <label htmlFor="nome">Nome:</label>
              <input id="nome" type="text" placeholder="Digite seu nome"/>
            </div>

            <div className="login-field">
              <label htmlFor="email">E-mail:</label>
              <input id="email" type="email" placeholder="Digite seu e-mail"/>
            </div>

            <div className="login-field">
              <label htmlFor="cidade">Cidade de origem:</label>
              <input id="cidade" type="text" placeholder="Digite sua cidade de origem"/>
            </div>

            {/* linha 2 */}
            <div className="login-field">
              <label htmlFor="sobrenome">Sobrenome:</label>
              <input id="sobrenome" type="text" placeholder="Digite seu sobrenome"/>
            </div>

            <div className="login-field">
              <label htmlFor="senha">Senha:</label>
              <input id="senha" type="password" placeholder="Digite sua senha"/>
            </div>

            <div className="login-field">
              <label htmlFor="confirmaSenha">Confirma Senha:</label>
              <input id="confirmaSenha" type="password" placeholder="Confirme sua senha"/>
            </div>
          </div>

          {/* botões lado a lado */}
          <div className="signup-actions">
            <button type="button" className="btn btn-primary">
              Entrar/Criar Conta
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onVoltarLogin}
            >
              Voltar para Login
            </button>
          </div>
        </form>
      </div>
        </div>
        <footer className="app-footer">
        © Copyright Eco Fortaleza <br/> Todos os Direitos Reservados
      </footer>
    </div>
  );
};

export default CriarContaPage;
