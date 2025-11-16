import "./HomePage.css";

function HomePage() {
  return (
    <div>
        <div className="home-frame">
      <div className="home-main">
        {/* LADO ESQUERDO – MAPA + BUSCA */}
        <section className="home-left">
          <header className="home-left-header">
            <div className="home-logo">ECO TUR</div>

            <div className="home-search">
              <span className="home-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Buscar Pontos"
                className="home-search-input"
              />
            </div>
          </header>

          <div className="home-map">
            {/* Aqui depois entra o mapa de verdade (Leaflet / iframe) */}
            <div className="home-map-placeholder">
              Mapa aqui (lugar reservado)
            </div>
          </div>
        </section>

        {/* DIVISÓRIA VERTICAL */}
        <div className="home-divider" />

        {/* LADO DIREITO – CATEGORIAS */}
        <section className="home-right">
          <header className="home-right-header">
            <div className="home-right-icons">
              <div className="home-icon-square" />
              <div className="home-icon-square" />
            </div>
          </header>

          {/* Bloco Praias */}
          <section className="home-section">
            <button className="home-section-title">Praias</button>

            <div className="home-cards-row">
              <article className="home-card">
                <div className="home-card-title">Av. Beira Mar</div>
                <div className="home-card-image" />
              </article>

              <article className="home-card">
                <div className="home-card-title">Praia Futuro</div>
                <div className="home-card-image" />
              </article>
            </div>
          </section>

          {/* Bloco Cidade */}
          <section className="home-section">
            <button className="home-section-title">Cidade</button>

            <div className="home-cards-row">
              <article className="home-card">
                <div className="home-card-title">PQ. do Cocó</div>
                <div className="home-card-image" />
              </article>

              <article className="home-card">
                <div className="home-card-title">Lagoa do Colosso</div>
                <div className="home-card-image" />
              </article>
            </div>
          </section>
        </section>
      </div>
    </div>
    <footer className="home-footer">
        © Copyright Eco Fortaleza Todos os Direitos Reservados
      </footer>
    </div>
  );
}

export default HomePage;
