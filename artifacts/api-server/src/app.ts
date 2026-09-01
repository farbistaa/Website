// artifacts/api-server/src/app.ts
import express from "express";
import cors from "cors";
import healthRouter from "./routes/health";
import newsletterRouter from "./routes/newsletter";
import assessmentRouter from "./routes/assessment";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://website-route2migrate.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      // allow no-Origin requests (curl, health checks) + whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use("/api/health", healthRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/assessment", assessmentRouter);

export default app;