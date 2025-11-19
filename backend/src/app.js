import express from "express";
import cors from "cors";
import { ping, query } from "./db.js";
import { validateSpotPayload } from "./validators/spotValidation.js";
import { notFound, errorHandler } from "./middlewares/errors.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "eco-tur-backend" });
});

app.get("/db-health", async (req, res) => {
  try {
    const ok = await ping();
    res.status(200).json({ db: ok ? "ok" : "fail" });
  } catch (e) {
    res.status(500).json({ db: "fail", error: e.message });
  }
});

app.get("/api/spots", async (req, res) => {
  try {
    const { category, district, q, limit = 20, offset = 0 } = req.query;
    const params = [];
    const where = [];

    if (category) { params.push(category); where.push(`category = $${params.length}`); }
    if (district) { params.push(district); where.push(`district = $${params.length}`); }
    if (q) {
      params.push(`%${q}%`);
      where.push(`(name ILIKE $${params.length} OR description ILIKE $${params.length})`);
    }

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM spots
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
    `;
    const countRes = await query(countSql, params);
    const total = countRes.rows[0].total;

const dataSql = `
  SELECT
    id,
    name,
    category,
    district,
    description,
    rating,
    latitude,
    longitude,
    image_url,
    created_at
  FROM spots
  ${where.length ? "WHERE " + where.join(" AND ") : ""}
  ORDER BY created_at DESC
  LIMIT $${params.length + 1} OFFSET $${params.length + 2}
`;
    const dataRes = await query(dataSql, [...params, Number(limit), Number(offset)]);

    // 3) meta de paginação
    const page = Math.floor(Number(offset) / Number(limit)) + 1;
    const totalPages = Math.max(1, Math.ceil(total / Number(limit)));

    res.set("X-Total-Count", String(total));
    res.json({
      data: dataRes.rows,
      meta: { total, page, totalPages, limit: Number(limit), offset: Number(offset) }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/spots/:id", async (req, res) => {
  try {
    const r = await query(
      `SELECT
         id,
         name,
         category,
         district,
         description,
         rating,
         latitude,
         longitude,
         image_url,
         created_at
       FROM spots
       WHERE id = $1`,
      [Number(req.params.id)]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: "not_found" });
    res.json(r.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/spots", async (req, res, next) => {
  try {
    const errors = validateSpotPayload(req.body);
    if (errors.length) return res.status(400).json({ error: "validation_error", details: errors });

    const { name, category, district = null, description = null, rating = 0 } = req.body;
    const r = await query(
      `INSERT INTO spots (name, category, district, description, rating)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, name, category, district, description, rating, created_at`,
      [name, category, district, description, rating]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { next(e); }
});

app.put("/api/spots/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "invalid_id" });

    const errors = validateSpotPayload(req.body);
    if (errors.length) return res.status(400).json({ error: "validation_error", details: errors });

    const { name, category, district = null, description = null, rating = 0 } = req.body;
    const r = await query(
      `UPDATE spots
         SET name=$1, category=$2, district=$3, description=$4, rating=$5
       WHERE id=$6
       RETURNING id, name, category, district, description, rating, created_at`,
      [name, category, district, description, rating, id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: "not_found" });
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

app.delete("/api/spots/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "invalid_id" });
    const r = await query("DELETE FROM spots WHERE id=$1", [id]);
    if (r.rowCount === 0) return res.status(404).json({ error: "not_found" });
    res.status(204).send();
  } catch (e) { next(e); }
});

app.post("/api/users/register", async (req, res, next) => {
  try {
    const { nome, sobrenome, cidade, email, senha } = req.body;

    if (!nome || !sobrenome || !cidade || !email || !senha) {
      return res
        .status(400)
        .json({ error: "validation_error", details: ["Todos os campos são obrigatórios."] });
    }

    const exists = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (exists.rowCount > 0) {
      return res.status(409).json({ error: "email_already_exists" });
    }

    const fullName = `${nome} ${sobrenome}`;

    const insert = await query(
      `INSERT INTO users (name, sobrenome, cidade, email, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, sobrenome, cidade, email, created_at`,
      [fullName, sobrenome, cidade, email, senha]
    );

    return res.status(201).json(insert.rows[0]);
  } catch (e) {
    next(e);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: "validation_error", details: ["E-mail e senha são obrigatórios."] });
    }

    const result = await query(
      "SELECT id, name, sobrenome, cidade, email FROM users WHERE email = $1 AND password = $2",
      [email, senha]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "invalid_credentials" });
    }

    const user = result.rows[0];
    return res.json({ user });
  } catch (e) {
    next(e);
  }
});

app.use(notFound);
app.use(errorHandler);

export default app;