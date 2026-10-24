// artifacts/api-server/src/app.ts
import express from "express";
import cors from "cors";
import healthRouter from "./routes/health";
import newsletterRouter from "./routes/newsletter";
import assessmentRouter from "./routes/assessment";

const app = express();

app.use(express.json());

const allowedOrigins = new Set([
  "https://website-route2migrate.vercel.app",
  "https://route2migrate.vercel.app",
  "https://route2migrate.ca",
  "https://www.route2migrate.ca",
]);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests and local Vite dev servers on any port.
      const isLocalDevOrigin =
        typeof origin === "string" &&
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

      if (!origin || allowedOrigins.has(origin) || isLocalDevOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/api/health", healthRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/assessment", assessmentRouter);

export default app;
