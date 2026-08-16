// artifacts/api-server/src/app.ts
import express from "express";
import healthRouter from "./routes/health";
import newsletterRouter from "./routes/newsletter";
import assessmentRouter from "./routes/assessment"; // <-- ADD THIS

const app = express();

app.use(express.json()); // Make sure this is here to parse JSON bodies

app.use("/api/health", healthRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/assessment", assessmentRouter); // <-- ADD THIS

export default app;