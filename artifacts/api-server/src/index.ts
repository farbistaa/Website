// artifacts/api-server/src/index.ts
import 'dotenv/config';
import app from "./app";
import { logger } from "./lib/logger";

// If process.env.PORT is missing, default to 3000 instead of crashing
const port = Number(process.env.PORT) || 3000;

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});