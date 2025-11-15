import request from "supertest";
import app from "../src/app.js";

describe("Validação Spots", () => {
  it("POST /api/spots sem name deve falhar 400", async () => {
    const res = await request(app).post("/api/spots").send({ category: "praia" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("validation_error");
  });

  it("POST /api/spots rating > 5 deve falhar 400", async () => {
    const res = await request(app).post("/api/spots").send({
      name: "Praia X",
      category: "praia",
      rating: 5.5
    });
    expect(res.status).toBe(400);
  });

  it("PUT /api/spots/:id com id inválido deve falhar 400", async () => {
    const res = await request(app).put("/api/spots/abc").send({
      name: "Teste",
      category: "praia"
    });
    expect(res.status).toBe(400);
  });
});
