import { useState } from "react";
import "./SettingsPage.css";

type SettingsPageProps = {
  onBackHome: () => void;
  onLogout: () => void;
};

type AbaAtiva = "perfil" | "idioma" | "notificacoes" | "feedback";

function SettingsPage({ onBackHome, onLogout }: SettingsPageProps) {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>("perfil");

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

        {/* Área central que troca de acordo com a aba (os outros ficam "hidden") */}
        <section className="settings-panel">
          {abaAtiva === "perfil" && (
            <div className="settings-panel-content">
              <h2>Editar Perfil</h2>
              <p className="settings-panel-text">
                Atualize as informações que você usou no cadastro. No futuro
                esses dados serão carregados automaticamente.
              </p>

              <form className="settings-form">
                <div className="settings-form-row">
                  <label htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Seu nome"
                    autoComplete="name"
                  />
                </div>

                <div className="settings-form-row">
                  <label htmlFor="sobrenome">Sobrenome</label>
                  <input
                    id="sobrenome"
                    type="text"
                    placeholder="Seu sobrenome"
                    autoComplete="family-name"
                  />
                </div>

                <div className="settings-form-row">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    autoComplete="email"
                  />
                </div>

                <div className="settings-form-row">
                  <label htmlFor="senha">Senha</label>
                  <input
                    id="senha"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>

                <div className="settings-form-row">
                  <label htmlFor="senha-confirma">Confirmar senha</label>
                  <input
                    id="senha-confirma"
                    type="password"
                    placeholder="Repita a nova senha"
                    autoComplete="new-password"
                  />
                </div>

                <button
                  type="button"
                  className="settings-primary-button"
                >
                  Salvar alterações
                </button>
              </form>
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
