import { closePool } from "../src/db.js";

afterAll(async () => {
  await closePool();
});
