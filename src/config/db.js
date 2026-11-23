import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./env.js";

mongoose.set("strictQuery", false);

// Optional: some local networks can't resolve mongodb+srv records with the default resolver.
if (env.dnsServers.length) dns.setServers(env.dnsServers);

// Cache the connection promise so serverless invocations (Vercel) reuse it.
let connection = null;

export const connectDB = () => {
  if (!connection) {
    connection = mongoose
      .connect(env.mongoUri, { dbName: env.mongoDbName })
      .then((conn) => {
        console.log(`MongoDB connected (${conn.connection.name})`);
        return conn;
      })
      .catch((error) => {
        connection = null;
        throw error;
      });
  }
  return connection;
};
