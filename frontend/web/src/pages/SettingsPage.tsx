import { useEffect, useState } from "react";
import "./SettingsPage.css";
import { atualizarUsuario, deletarUsuario } from "../services/api";

type SettingsPageProps = {
  onBackHome: () => void;
  onLogout: () => void;
};

type AbaAtiva = "perfil" | "idioma" | "notificacoes" | "feedback";

type UsuarioLocal = {
  id: number;
  name: string;
  email: string;
  sobrenome?: string;
  cidade?: string;
};

function SettingsPage({ onBackHome, onLogout }: SettingsPageProps) {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>("perfil");

  const [usuario, setUsuario] = useState<UsuarioLocal | null>(null);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cidade, setCidade] = useState("");
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setMensagem(null);
    setErro(null);
  }, [abaAtiva]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("eco_tur_user");
      if (!raw) return;

      const u = JSON.parse(raw) as UsuarioLocal;
      setUsuario(u);

      setNome(u.name || "");
      setEmail(u.email || "");
      setSobrenome(u.sobrenome || "");
      setCidade(u.cidade || "");
    } catch (e) {
      console.error("Erro ao ler eco_tur_user:", e);
    }
  }, []);

  async function handleSalvarPerfil() {
    if (!usuario) {
      setErro("Usuário não encontrado. Faça login novamente.");
      return;
    }

    if (!nome || !email) {
      setErro("Nome e Email são obrigatórios.");
      return;
    }

    try {
      setSalvando(true);
      setErro(null);
      setMensagem(null);

      const payload = {
        nome,
        sobrenome,
        cidade,
        email,
        senha: novaSenha ? novaSenha : undefined,
      };

      const resp = await atualizarUsuario(usuario.id, payload);
      const userAtualizado = resp.user;

      const atualizadoLocal: UsuarioLocal = {
        id: userAtualizado.id,
        name: userAtualizado.name,
        email: userAtualizado.email,
        sobrenome: userAtualizado.sobrenome,
        cidade: userAtualizado.cidade,
      };

      localStorage.setItem("eco_tur_user", JSON.stringify(atualizadoLocal));
      setUsuario(atualizadoLocal);

      setMensagem("Alterações salvas com sucesso!");
      setNovaSenha("");
    } catch (e: any) {
      console.error(e);
      setErro(
        e?.response?.data?.error || 
        e?.message ||
        "Não foi possível salvar as alterações."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function handleApagarConta() {
    if (!usuario) return;

    const confirmar = window.confirm(
      "Tem certeza que deseja apagar sua conta? Esta ação é irreversível."
    );

    if (!confirmar) return;

    try {
      setSalvando(true);
      await deletarUsuario(usuario.id);
      localStorage.removeItem("eco_tur_user");
      alert("Conta apagada com sucesso.");
      onLogout();
    } catch (e: any) {
      setErro("Erro ao apagar conta: " + (e?.message || "Tente novamente."));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="settings-frame">
      <div className="settings-inner">
        {/* Cabeçalho */}
        <header className="settings-header">
          <div className="settings-logo">ECO TUR</div>
        </header>

        {/* Boas-vindas (some no mobile via CSS) */}
        <section className="settings-welcome">
          <h1>Olá, {usuario?.name || "Visitante"}!</h1>
          <p>
            Gerencie seus dados e preferências do aplicativo.
          </p>
        </section>

        {/* Abas */}
        <nav className="settings-tabs">
          <button
            type="button"
            className={`settings-tab ${abaAtiva === "perfil" ? "settings-tab--active" : ""}`}
            onClick={() => setAbaAtiva("perfil")}
          >
            Perfil
          </button>
          <button
            type="button"
            className={`settings-tab ${abaAtiva === "idioma" ? "settings-tab--active" : ""}`}
            onClick={() => setAbaAtiva("idioma")}
          >
            Idioma
          </button>
          <button
            type="button"
            className={`settings-tab ${abaAtiva === "notificacoes" ? "settings-tab--active" : ""}`}
            onClick={() => setAbaAtiva("notificacoes")}
          >
            Notificações
          </button>
          <button
            type="button"
            className={`settings-tab ${abaAtiva === "feedback" ? "settings-tab--active" : ""}`}
            onClick={() => setAbaAtiva("feedback")}
          >
            Feedback
          </button>
        </nav>

        {/* Área de Mensagens */}
        {(erro || mensagem) && (
          <div style={{ marginBottom: 16, padding: '10px', borderRadius: '8px', background: erro ? '#ffebee' : '#e8f5e9' }}>
            {erro && <p style={{ color: "#c62828", fontSize: 13, fontWeight: 'bold' }}>{erro}</p>}
            {mensagem && <p style={{ color: "#2e7d32", fontSize: 13, fontWeight: 'bold' }}>{mensagem}</p>}
          </div>
        )}

        {/* Painel Central */}
        <section className="settings-panel">
          
          {abaAtiva === "perfil" && (
            <div className="settings-panel-content">
              <h2>Editar Perfil</h2>
              <form className="settings-form-grid">
                <div className="settings-form-item">
                  <label>Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>

                <div className="settings-form-item">
                  <label>Sobrenome</label>
                  <input
                    type="text"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    placeholder="Sobrenome"
                  />
                </div>

                <div className="settings-form-item">
                  <label>Cidade</label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Sua cidade"
                  />
                </div>

                <div className="settings-form-item">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="settings-form-item">
                  <label>Nova Senha (Opcional)</label>
                  <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Nova senha"
                  />
                </div>
                
                {/* Botão de Salvar dentro do Grid para alinhar ou fora? 
                    Vamos deixar fora do grid mas dentro do painel */}
              </form>
              
              <button
                type="button"
                className="settings-primary-button"
                onClick={handleSalvarPerfil}
                disabled={salvando}
                style={{ width: '100%', marginTop: '10px' }}
              >
                {salvando ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          )}

          {abaAtiva === "idioma" && (
            <div className="settings-panel-content">
              <h2>Idioma e Região</h2>
              <p className="settings-panel-text">
                Selecione o idioma de visualização do aplicativo.
              </p>
              <ul className="settings-list">
                <li>
                  <span>Português (Brasil)</span>
                  <span className="settings-list-tag">Atual</span>
                </li>
                <li><span>Inglês</span></li>
                <li><span>Espanhol</span></li>
              </ul>
            </div>
          )}

          {abaAtiva === "notificacoes" && (
            <div className="settings-panel-content">
              <h2>Notificações</h2>
              <p className="settings-panel-text">
                Gerencie como você recebe alertas.
              </p>
              <div className="settings-form">
                <label className="settings-toggle">
                  <input type="checkbox" />
                  <span className="settings-toggle-slider" />
                  <span className="settings-toggle-label">Alertas de Proximidade</span>
                </label>
                <label className="settings-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="settings-toggle-slider" />
                  <span className="settings-toggle-label">Novidades e Atualizações</span>
                </label>
              </div>
            </div>
          )}

          {abaAtiva === "feedback" && (
            <div className="settings-panel-content">
              <h2>Feedback</h2>
              <p className="settings-panel-text">
                Encontrou um erro ou tem uma sugestão? Conte para nós.
              </p>
              <a
                className="settings-primary-button"
                href="https://docs.google.com/forms/d/e/1FAIpQLSeoiIxLIYwlWXM09swyeMTx_klue2kJEbQEkpZUFDKRol54LA/viewform?usp=sharing"
                target="_blank"
                rel="noreferrer"
                style={{ width: '100%', textAlign: 'center' }}
              >
                Abrir Formulário
              </a>
            </div>
          )}
        </section>

        {/* Botões do Rodapé */}
        <section className="settings-bottom-row">
          <button type="button" className="settings-card--exit" onClick={onBackHome}>
            Voltar
          </button>
          <button type="button" className="settings-card--exit" onClick={onLogout}>
            Sair da Conta
          </button>
          <button
            type="button"
            className="settings-card--exit settings-card--danger"
            onClick={handleApagarConta}
            disabled={salvando}
          >
            Apagar Conta
          </button>
        </section>
      </div>

      <footer className="settings-footer">
        © Copyright Eco Fortaleza
      </footer>
    </div>
  );
}

export default SettingsPage;