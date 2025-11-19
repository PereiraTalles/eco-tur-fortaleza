import request from "supertest";
import app from "../src/app.js";
import { query } from "../src/db.js";

beforeAll(async () => {
  await query("DELETE FROM spots");
});

describe("Spots API", () => {
  it("POST /api/spots cria um spot", async () => {
    const payload = {
      name: "Praia do Futuro",
      category: "praia",
      district: "Praia do Futuro",
      description: "Praia com estrutura e opções sustentáveis",
      rating: 4.5
    };
    const res = await request(app).post("/api/spots").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(payload.name);
  });

  it("GET /api/spots lista spots", async () => {
    const res = await request(app).get("/api/spots");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("GET /api/spots/:id retorna detalhe", async () => {
    const list = await request(app).get("/api/spots");
    const firstId = list.body.data[0].id;
    const res = await request(app).get(`/api/spots/${firstId}`);
    expect([200,404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("id", firstId);
    }
  });
});
it("PUT /api/spots/:id atualiza um spot", async () => {
  const list = await request(app).get("/api/spots");
  const id = list.body.data[0].id;

  const payload = {
    name: "Praia do Futuro (Atualizada)",
    category: "praia",
    district: "Praia do Futuro",
    description: "Atualizado para testes",
    rating: 4.8
  };

  const res = await request(app).put(`/api/spots/${id}`).send(payload);
  expect([200,404]).toContain(res.status);
  if (res.status === 200) {
    expect(res.body).toHaveProperty("id", id);
    expect(res.body.name).toBe(payload.name);
  }
});

it("DELETE /api/spots/:id remove um spot", async () => {
  const novo = await request(app).post("/api/spots").send({
    name: "Ponto para Deletar",
    category: "parque",
    district: "Centro",
    description: "Para teste de delete",
    rating: 3.5
  });
  expect(novo.status).toBe(201);
  const id = novo.body.id;

  const del = await request(app).delete(`/api/spots/${id}`);
  expect([204,404]).toContain(del.status);

  const det = await request(app).get(`/api/spots/${id}`);
  expect(det.status).toBe(404);
});
it("GET /api/spots suporta paginação", async () => {
  for (let i = 0; i < 3; i++) {
    await request(app).post("/api/spots").send({
      name: `Spot Paginado ${i}`,
      category: "trilha",
      district: "Serra",
      description: "Teste paginação",
      rating: 4
    });
  }

  const res = await request(app).get("/api/spots?limit=2&offset=0");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.data)).toBe(true);
  expect(res.body.meta).toBeDefined();
  expect(res.body.meta.limit).toBe(2);
  expect(res.headers["x-total-count"]).toBeDefined();
});
