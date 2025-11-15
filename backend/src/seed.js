import "dotenv/config";
import { query } from "./db.js";

const spots = [
  {
    name: "Parque do Cocó",
    category: "parque",
    district: "Cocó",
    description: "Trilhas, manguezal e ações de educação ambiental.",
    rating: 4.7
  },
  {
    name: "Praia do Futuro",
    category: "praia",
    district: "Praia do Futuro",
    description: "Praia com boa ventilação e estrutura. Incentivo a descarte correto.",
    rating: 4.5
  },
  {
    name: "Engenho Velho (Trilha)",
    category: "trilha",
    district: "Messejana",
    description: "Trilha leve com pontos de observação e fauna local.",
    rating: 4.3
  },
  {
    name: "Passeio Ciclístico Beira-Mar",
    category: "mobilidade",
    district: "Meireles",
    description: "Rota ciclável sinalizada; foco em mobilidade sustentável.",
    rating: 4.6
  }
];

async function run() {
  try {
    for (const s of spots) {
      await query(
        `INSERT INTO spots (name, category, district, description, rating)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT DO NOTHING`,
        [s.name, s.category, s.district, s.description, s.rating]
      );
    }
    console.log(`✅ Seed concluído: ${spots.length} registros inseridos.`);
    process.exit(0);
  } catch (e) {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  }
}

run();
