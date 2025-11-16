import React, { useState } from "react";
import { criarUsuario } from "../services/api";

type CriarContaPageProps = {
  onVoltarLogin: () => void;
};

const CriarContaPage: React.FC<CriarContaPageProps> = ({ onVoltarLogin }) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleCreate = async () => {
    if (!nome || !sobrenome || !email || !cidade || !senha || !confirmaSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmaSenha) {
      alert("As senhas não conferem.");
      return;
    }

    try {
      setCarregando(true);

      await criarUsuario({
        nome,
        sobrenome,
        cidade,
        email,
        senha,
      });

      alert("Conta criada com sucesso!");
      onVoltarLogin(); // volta pra tela de login
    } catch (error: any) {
      console.error(error);
      alert("Erro ao criar conta. Tente novamente.");
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

          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            <div className="signup-grid">
              {/* linha 1 */}
              <div className="login-field">
                <label htmlFor="nome">Nome:</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

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
                <label htmlFor="cidade">Cidade de origem:</label>
                <input
                  id="cidade"
                  type="text"
                  placeholder="Digite sua cidade de origem"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>

              {/* linha 2 */}
              <div className="login-field">
                <label htmlFor="sobrenome">Sobrenome:</label>
                <input
                  id="sobrenome"
                  type="text"
                  placeholder="Digite seu sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                />
              </div>

              <div className="login-field">
                <label htmlFor="senha">Senha:</label>
                <input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="login-field">
                <label htmlFor="confirmaSenha">Confirma Senha:</label>
                <input
                  id="confirmaSenha"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmaSenha}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                />
              </div>
            </div>

            <div className="signup-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreate}
                disabled={carregando}
              >
                {carregando ? "Criando..." : "Entrar/Criar Conta"}
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
        © Copyright Eco Fortaleza <br /> Todos os Direitos Reservados
      </footer>
    </div>
  );
};

export default CriarContaPage;
