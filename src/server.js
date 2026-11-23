import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

// On Vercel the platform calls the exported app; locally we start a server.
if (!process.env.VERCEL) {
  connectDB().catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
  app.listen(env.port, () => {
    console.log(`Sarnia Hindu Society listening on http://localhost:${env.port}`);
  });
}

export default app;
