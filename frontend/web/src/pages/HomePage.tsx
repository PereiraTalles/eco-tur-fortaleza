import { useEffect, useState } from "react";
import "./HomePage.css";
import { listarSpots } from "../services/api";
import type { Spot } from "../services/api";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";

// --- Componentes Auxiliares do Mapa ---

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
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 5 }]
      },
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [origem, destino, map]);

  return null;
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

// --- Componente Principal ---

type HomePageProps = {
  onLogout: () => void;
  onSettings: () => void;
};

function HomePage({ onLogout, onSettings }: HomePageProps) {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [origem, setOrigem] = useState<[number, number] | null>(null);
  const [destino, setDestino] = useState<[number, number] | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  
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

  const praias = spots.filter((s) => s.category?.trim().toLowerCase() === "praia");
  const cidades = spots.filter((s) => s.category?.trim().toLowerCase() === "cidade");

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
    // 1. Fecha o menu mobile se estiver aberto
    setMenuAberto(false);

    // 2. Lógica de rota
    if (spot.latitude != null && spot.longitude != null) {
      setDestino([spot.latitude, spot.longitude]);
    } else {
      alert("Esse ponto ainda não tem coordenadas cadastradas.");
      abrirNoMaps(spot);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigem([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error(error);
          alert("Não foi possível obter sua localização. Abrindo no Maps…");
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
      {/* --- MENU MOBILE OVERLAY (Onde ficam os carrosséis agora) --- */}
      <div className={`mobile-menu-overlay ${menuAberto ? "open" : ""}`}>
        <div className="mobile-carousel-container">
           
           {/* Título e Carrossel Praias */}
           <div className="mobile-carousel-title">Praias</div>
           <div className="home-cards-row">
             {praiasFiltradas.map((spot) => (
               <article key={spot.id} className="home-card" onClick={() => handleCardClick(spot)}>
                 <div className="home-card-title">{spot.name}</div>
                 <div className="home-card-image" style={spot.image_url ? { backgroundImage: `url(${spot.image_url})` } : undefined} />
               </article>
             ))}
             {!loading && praiasFiltradas.length === 0 && <span style={{color:'white'}}>Vazio.</span>}
           </div>

           {/* Título e Carrossel Cidades */}
           <div className="mobile-carousel-title">Cidade</div>
           <div className="home-cards-row">
             {cidadesFiltradas.map((spot) => (
               <article key={spot.id} className="home-card" onClick={() => handleCardClick(spot)}>
                 <div className="home-card-title">{spot.name}</div>
                 <div className="home-card-image" style={spot.image_url ? { backgroundImage: `url(${spot.image_url})` } : undefined} />
               </article>
             ))}
              {!loading && cidadesFiltradas.length === 0 && <span style={{color:'white'}}>Vazio.</span>}
           </div>

           {/* Botão para fechar sem selecionar nada */}
           <button className="mobile-close-btn" onClick={() => setMenuAberto(false)}>
             Fechar Menu
           </button>
        </div>
      </div>

      <div className="home-frame">
        
        {/* --- ÁREA MOBILE FLUTUANTE --- */}
        <div className="mobile-topbar">
          <div className="mobile-logo">ECO TUR</div>
          <div className="mobile-search">
            <span className="mobile-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div className="mobile-menu" onClick={() => setMenuAberto(true)}>
            ☰
          </div>
        </div>

        <div className="mobile-actions">
          <button className="mobile-btn" onClick={onSettings}>Config</button>
          <button className="mobile-btn" onClick={onLogout}>Sair</button>
        </div>

        {/* --- ESTRUTURA PRINCIPAL (Desktop) --- */}
        <div className="home-main">
          <section className="home-left">
            {/* Header Desktop */}
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
                  center={fortalezaCenter}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="home-map-leaflet"
                  zoomControl={false} 
                >
                  <TileLayer
                    attribution='© OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapResizer /> 
                  {origem && destino && <Rota origem={origem} destino={destino} />}
                </MapContainer>
              )}
            </div>
          </section>

          <div className="home-divider" />

          <section className="home-right">
            <header className="home-right-header">
              <div className="home-right-icons">
                <div className="home-icon-square" />
                <div className="home-icon-square" />
              </div>
            </header>

            {erro && <p className="home-error">{erro}</p>}

            <section className="home-section">
              <button className="home-section-title">Praias</button>
              <div className="home-cards-row home-cards-carousel">
                {praiasFiltradas.map((spot) => (
                  <article key={spot.id} className="home-card" onClick={() => handleCardClick(spot)}>
                    <div className="home-card-title">{spot.name}</div>
                    <div className="home-card-image" style={spot.image_url ? { backgroundImage: `url(${spot.image_url})` } : undefined} />
                  </article>
                ))}
              </div>
            </section>

            <section className="home-section">
              <button className="home-section-title">Cidade</button>
              <div className="home-cards-row home-cards-carousel">
                {cidadesFiltradas.map((spot) => (
                  <article key={spot.id} className="home-card" onClick={() => handleCardClick(spot)}>
                    <div className="home-card-title">{spot.name}</div>
                    <div className="home-card-image" style={spot.image_url ? { backgroundImage: `url(${spot.image_url})` } : undefined} />
                  </article>
                ))}
              </div>
            </section>

            <div className="home-bottom-actions">
              <button className="home-bottom-button" onClick={onSettings}>Configuração</button>
              <button className="home-bottom-button home-bottom-button-exit" onClick={onLogout}>Sair</button>
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