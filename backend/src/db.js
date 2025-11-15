import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export async function query(text, params) {
  return pool.query(text, params);
}

export async function ping() {
  const r = await query("SELECT 1 as ok");
  return r.rows[0]?.ok === 1;
}
export async function closePool() {
  await pool.end();
}