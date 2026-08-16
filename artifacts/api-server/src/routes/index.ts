// artifacts/api-server/src/routes/index.ts
import { Router } from "express";
import healthRouter from "./health";
import newsletterRouter from "./newsletter";
import assessmentRouter from "./assessment"; // <-- ADD THIS

const router = Router();

router.use("/health", healthRouter);
router.use("/newsletter", newsletterRouter);
router.use("/assessment", assessmentRouter); // <-- ADD THIS

export default router;