-- versão inicial do esquema
-- Tabela de pontos eco (spots)
CREATE TABLE IF NOT EXISTS spots (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,         -- ex: praia, trilha, parque
  district TEXT,                  -- bairro
  description TEXT,
  rating NUMERIC(2,1) DEFAULT 0,  -- 0.0 a 5.0
  created_at TIMESTAMP DEFAULT NOW()
);

-- Usuários (para favorito/avaliações mais tarde)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Avaliações simples (opcional por enquanto)
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  spot_id INTEGER REFERENCES spots(id),
  stars INTEGER CHECK (stars BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
