import "./settings.css";

function Settings() {
  return (
    <div className="settings-frame">
      <div className="settings-inner">
        {/* Cabeçalho */}
        <header className="settings-header">
          <div className="settings-logo">ECO TUR</div>
        </header>

        {/* Boas-vindas genérica */}
        <section className="settings-welcome">
          <h1>Seja bem-vindo ao Eco Tur Fortaleza/CE</h1>
          <p>
            Aqui você pode revisar seus dados, privacidade, idioma e como falar
            com nossa equipe de suporte.
          </p>
        </section>

        {/* Grid principal de configurações */}
        <section className="settings-grid">
          {/* Editar Perfil */}
          <div className="settings-card">
            <div className="settings-card-title">Editar Perfil</div>
            <div className="settings-card-desc">
              Atualize seu nome, informações de contato e outros detalhes da
              sua conta.
            </div>
          </div>

          {/* Privacidade */}
          <div className="settings-card">
            <div className="settings-card-title">Privacidade</div>
            <div className="settings-card-desc">
              Veja como usamos seus dados e gerencie o uso da sua localização
              dentro do aplicativo.
            </div>
          </div>

          {/* Idioma e Região */}
          <div className="settings-card">
            <div className="settings-card-title">Idioma e Região</div>
            <div className="settings-card-desc">
              Defina o idioma principal do app e ajuste a região padrão das
              recomendações.
            </div>
          </div>

          {/* Feedback e Suporte */}
          <div className="settings-card">
            <div className="settings-card-title">Feedback e Suporte</div>
            <div className="settings-card-desc">
              Envie sugestões, elogios ou problemas por e-mail para a nossa
              equipe.
            </div>
          </div>

          {/* Espaços vazios só para manter o layout em 3 colunas */}
          <div
            className="settings-card settings-card-empty"
            aria-hidden="true"
          />
          <div
            className="settings-card settings-card-empty"
            aria-hidden="true"
          />
        </section>

        {/* Linha final: Sair / Deletar Conta */}
        <section className="settings-bottom-row">
          <div className="settings-card--exit">
            Sair do App
          </div>
          <div className="settings-card--exit settings-card--danger">
            Deletar Conta
          </div>
        </section>
      </div>

      <footer className="settings-footer">
        © Copyright Eco Fortaleza Todos os Direitos Reservados
      </footer>
    </div>
  );
}

export default Settings;
