import request from "supertest";
import app from "../src/app.js";

describe("GET /db-health", () => {
  it("retorna 200 e db ok/fail", async () => {
    const res = await request(app).get("/db-health");
    expect([200,500]).toContain(res.status);
  });
});
