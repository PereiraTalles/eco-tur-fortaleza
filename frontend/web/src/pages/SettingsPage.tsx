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
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Carregar usuário do localStorage ao abrir Configurações
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

    if (!nome || !sobrenome || !cidade || !email) {
      setErro("Preencha todos os campos obrigatórios.");
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
        // se quiser já usar a novaSenha, pode mandar aqui
        senha: novaSenha ? novaSenha : undefined,
      };

      const resp = await atualizarUsuario(usuario.id, payload);
      const userAtualizado = resp.user;

      // Atualiza localStorage com o novo usuário
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
      setSenhaAtual("");
      setNovaSenha("");
    } catch (e: any) {
      console.error(e);
      setErro(
        e?.message ||
          "Não foi possível salvar as alterações. Tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function handleApagarConta() {
    if (!usuario) {
      setErro("Usuário não encontrado. Faça login novamente.");
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja apagar sua conta? Esta ação não pode ser desfeita."
    );

    if (!confirmar) return;

    try {
      setSalvando(true);
      setErro(null);
      setMensagem(null);

      await deletarUsuario(usuario.id);

      // limpa localStorage e volta pro fluxo de logout
      localStorage.removeItem("eco_tur_user");
      localStorage.removeItem("eco_tur_tela");

      alert("Conta apagada com sucesso.");
      onLogout();
    } catch (e: any) {
      console.error(e);
      setErro(
        e?.message ||
          "Não foi possível apagar sua conta. Tente novamente."
      );
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

        {/* Boas-vindas fixa */}
        <section className="settings-welcome">
          <h1>Seja bem-vindo ao Eco Tur Fortaleza/CE</h1>
          <p>
            Aqui você pode verificar seus dados, idioma, notificações e enviar
            feedback para nossa equipe.
          </p>
        </section>

        {/* Abas principais */}
        <nav className="settings-tabs">
          <button
            type="button"
            className={
              "settings-tab" +
              (abaAtiva === "perfil" ? " settings-tab--active" : "")
            }
            onClick={() => setAbaAtiva("perfil")}
          >
            Perfil
          </button>

          <button
            type="button"
            className={
              "settings-tab" +
              (abaAtiva === "idioma" ? " settings-tab--active" : "")
            }
            onClick={() => setAbaAtiva("idioma")}
          >
            Idioma e Região
          </button>

          <button
            type="button"
            className={
              "settings-tab" +
              (abaAtiva === "notificacoes" ? " settings-tab--active" : "")
            }
            onClick={() => setAbaAtiva("notificacoes")}
          >
            Notificações
          </button>

          <button
            type="button"
            className={
              "settings-tab" +
              (abaAtiva === "feedback" ? " settings-tab--active" : "")
            }
            onClick={() => setAbaAtiva("feedback")}
          >
            Feedback
          </button>
        </nav>

        {/* Mensagens de erro/sucesso */}
        {(erro || mensagem) && (
          <div style={{ marginBottom: 10 }}>
            {erro && (
              <p style={{ color: "#ffb3b3", fontSize: 12 }}>{erro}</p>
            )}
            {mensagem && (
              <p style={{ color: "#b2ffb2", fontSize: 12 }}>{mensagem}</p>
            )}
          </div>
        )}

        {/* Área central que troca de acordo com a aba */}
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
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div className="settings-form-item">
                  <label>Senha atual</label>
                  <input
                    type="password"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div className="settings-form-item">
                  <label>Sobrenome</label>
                  <input
                    type="text"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    placeholder="Seu sobrenome"
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
                  <label>Nova senha</label>
                  <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Nova senha"
                  />
                </div>
              </form>

              <button
                type="button"
                className="settings-primary-button"
                onClick={handleSalvarPerfil}
                disabled={salvando}
              >
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          )}

          {abaAtiva === "idioma" && (
            <div className="settings-panel-content">
              <h2>Idioma e Região</h2>
              <p className="settings-panel-text">
                Esses idiomas aparecem apenas como visualização. No futuro você
                poderá alternar o idioma do aplicativo por aqui.
              </p>

              <ul className="settings-list">
                <li>
                  <span className="settings-list-label">Português (Brasil)</span>
                  <span className="settings-list-tag">Padrão</span>
                </li>
                <li>
                  <span className="settings-list-label">Inglês</span>
                </li>
                <li>
                  <span className="settings-list-label">Espanhol</span>
                </li>
                <li>
                  <span className="settings-list-label">Francês</span>
                </li>
                <li>
                  <span className="settings-list-label">Italiano</span>
                </li>
                <li>
                  <span className="settings-list-label">Alemão</span>
                </li>
              </ul>
            </div>
          )}

          {abaAtiva === "notificacoes" && (
            <div className="settings-panel-content">
              <h2>Notificações</h2>
              <p className="settings-panel-text">
                No futuro o app poderá avisar quando você estiver perto de um
                ponto turístico interessante.
              </p>

              <div className="settings-form">
                <label className="settings-toggle">
                  <input type="checkbox" />
                  <span className="settings-toggle-slider" />
                  <span className="settings-toggle-label">
                    Ativar alerta quando eu estiver perto de um ponto do Eco Tur
                    Fortaleza.
                  </span>
                </label>

                <p className="settings-notice">
                  * Este recurso é apenas visual por enquanto. Em versões
                  futuras, a notificação será ativada de verdade.
                </p>
              </div>
            </div>
          )}

          {abaAtiva === "feedback" && (
            <div className="settings-panel-content">
              <h2>Feedback e Suporte</h2>
              <p className="settings-panel-text">
                Sua opinião é muito importante para melhorarmos o Eco Tur
                Fortaleza. Use o formulário abaixo para enviar sugestões, elogios
                ou problemas encontrados.
              </p>

              <a
                className="settings-primary-button"
                href="https://docs.google.com/forms/d/e/1FAIpQLSeoiIxLIYwlWXM09swyeMTx_klue2kJEbQEkpZUFDKRol54LA/viewform?usp=sharing&ouid=116439177875750380903"
                target="_blank"
                rel="noreferrer"
              >
                Abrir formulário de feedback
              </a>

              <p className="settings-notice">
                O formulário será aberto em uma nova aba do navegador.
              </p>
            </div>
          )}
        </section>

        {/* Botões fixos embaixo */}
        <section className="settings-bottom-row">
          <button
            type="button"
            className="settings-card--exit"
            onClick={onBackHome}
          >
            Voltar para Home
          </button>

          <button
            type="button"
            className="settings-card--exit"
            onClick={onLogout}
          >
            Sair do App
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
        © Copyright Eco Fortaleza Todos os Direitos Reservados
      </footer>
    </div>
  );
}

export default SettingsPage;
