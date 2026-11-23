import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// Load .env with Node's built-in loader (no dotenv needed). Missing file is fine
// when variables come from the hosting provider instead.
try {
  process.loadEnvFile(path.join(ROOT_DIR, ".env"));
} catch {
  /* no .env file */
}

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT) || 8000,
  mongoUri: required("MONGO_URI"),
  mongoDbName: process.env.MONGO_DB_NAME?.trim() || undefined,
  jwtSecret: required("JWT_SECRET"),
  corsOrigin: process.env.CORS_ORIGIN?.trim() || "*",
  dnsServers: (process.env.DNS_SERVERS ?? "").split(",").map((s) => s.trim()).filter(Boolean),
  uploadDir: path.join(ROOT_DIR, "upload"),
};
