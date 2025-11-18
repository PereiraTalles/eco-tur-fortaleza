import { useEffect, useState } from "react";
import "./HomePage.css";
import { listarSpots } from "../services/api";
import type { Spot } from "../services/api";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";

type RotaProps = {
  origem: [number, number] | null;
  destino: [number, number] | null;
};

function Rota({ origem, destino }: RotaProps) {
  const map = useMap();

  useEffect(() => {
    if (!origem || !destino) return;

    const routingControl = (L as any).Routing.control({
      waypoints: [
        L.latLng(origem[0], origem[1]),
        L.latLng(destino[0], destino[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    // limpar a rota antiga quando origem/destino mudarem
    return () => {
      map.removeControl(routingControl);
    };
  }, [origem, destino, map]);

  return null;
}


  type HomePageProps = {
    onLogout: () => void;
  };

  function HomePage({ onLogout }: HomePageProps) {
    const [spots, setSpots] = useState<Spot[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [busca, setBusca] = useState("");
    const [origem, setOrigem] = useState<[number, number] | null>(null);
    const [destino, setDestino] = useState<[number, number] | null>(null);

  // centro padrão do mapa (Fortaleza)
  const fortalezaCenter: [number, number] = [-3.7319, -38.5267];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resposta = await listarSpots();
        setSpots(resposta.data);
        setErro(null);
      } catch (e) {
        console.error(e);
        setErro("Falha ao carregar pontos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const praias = spots.filter(
    (s) => s.category && s.category.toLowerCase() === "praia"
  );

  const cidades = spots.filter(
    (s) => s.category && s.category.toLowerCase() === "cidade"
  );

  const filtrarPorBusca = (lista: Spot[]) => {
    if (!busca.trim()) return lista;
    const termo = busca.toLowerCase();
    return lista.filter(
      (s) =>
        s.name.toLowerCase().includes(termo) ||
        (s.district ?? "").toLowerCase().includes(termo)
    );
  };

  const praiasFiltradas = filtrarPorBusca(praias);
  const cidadesFiltradas = filtrarPorBusca(cidades);

  function abrirNoMaps(spot: Spot) {
    let url: string;
    if (spot.latitude != null && spot.longitude != null) {
      url = `https://www.google.com/maps/search/?api=1&query=${spot.latitude},${spot.longitude}`;
    } else {
      const query = encodeURIComponent(`${spot.name} Fortaleza CE`);
      url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
    window.open(url, "_blank");
  }
    function handleCardClick(spot: Spot) {
  if (spot.latitude != null && spot.longitude != null) {
    // destino = ponto clicado
    setDestino([spot.latitude, spot.longitude]);
  } else {
    alert("Esse ponto ainda não tem coordenadas cadastradas.");
    // PLANO B - abre no Google Maps
    abrirNoMaps(spot);
    return;
  }

  // tentar pegar localização do usuário (GPS)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // deu certo → seta origem e seguimos
        setOrigem([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error(error);
        alert("Não foi possível obter sua localização. Abrindo no Maps…");

        // PLANO B: abre no Google Maps
        abrirNoMaps(spot);
      }
    );
  } else {
    alert("Seu navegador não suporta geolocalização. Abrindo no Maps…");
    abrirNoMaps(spot);
  }
}


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
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </header>

            <div className="home-map">
              {loading ? (
                <div className="home-map-placeholder">Carregando pontos...</div>
              ) : (
                <MapContainer
                    {...({
                        center: fortalezaCenter,
                        zoom: 12,
                        scrollWheelZoom: true,
                        className: "home-map-leaflet",
                    } as any)}
                    >
                    <TileLayer
                        {...({
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        } as any)}
                    />

                    {origem && destino && <Rota origem={origem} destino={destino} />}
                </MapContainer>

              )}
            </div>
          </section>

          {/* DIVISÓRIA VERTICAL */}
          <div className="home-divider" />

          {/* LADO DIREITO – CATEGORIAS + CARROSÉIS */}
          <section className="home-right">
            <header className="home-right-header">
              <div className="home-right-icons">
                <div className="home-icon-square" />
                <div className="home-icon-square" />
              </div>
            </header>

            {erro && <p className="home-error">{erro}</p>}

            {/* Bloco Praias */}
            <section className="home-section">
              <button className="home-section-title">Praias</button>

              <div className="home-cards-row home-cards-carousel">
                {praiasFiltradas.map((spot) => (
                  <article
                    key={spot.id}
                    className="home-card"
                    onClick={() => handleCardClick(spot)}
                  >
                    <div className="home-card-title">{spot.name}</div>
                    <div
                      className="home-card-image"
                      style={
                        spot.image_url
                          ? {
                              backgroundImage: `url(${spot.image_url})`,
                            }
                          : undefined
                      }
                    />
                  </article>
                ))}

                {!loading && praiasFiltradas.length === 0 && (
                  <span className="home-empty">Nenhuma praia encontrada.</span>
                )}
              </div>
            </section>

            {/* Bloco Cidade */}
            <section className="home-section">
              <button className="home-section-title">Cidade</button>

              <div className="home-cards-row home-cards-carousel">
                {cidadesFiltradas.map((spot) => (
                  <article
                    key={spot.id}
                    className="home-card"
                    onClick={() => handleCardClick(spot)}
                  >
                    <div className="home-card-title">{spot.name}</div>
                    <div
                      className="home-card-image"
                      style={
                        spot.image_url
                          ? {
                              backgroundImage: `url(${spot.image_url})`,
                            }
                          : undefined
                      }
                    />
                  </article>
                ))}

                {!loading && cidadesFiltradas.length === 0 && (
                  <span className="home-empty">
                    Nenhum ponto de cidade encontrado.
                  </span>
                )}
              </div>
            </section>

            {/* BOTÕES INFERIORES (sem lógica ainda) */}
            <div className="home-bottom-actions">
              <button className="home-bottom-button">Configuração</button>
              <button className="home-bottom-button home-bottom-button-exit" onClick={onLogout}>
                Sair
              </button>
            </div>
          </section>
        </div>
      </div>

      <footer className="home-footer">
        © Copyright Eco Fortaleza <br /> Todos os Direitos Reservados
      </footer>
    </div>
  );
}

export default HomePage;
