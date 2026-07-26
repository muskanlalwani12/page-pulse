import { Router } from "express";
import { auditWebsite } from "../controllers/auditController";

const router = Router();

router.post("/", auditWebsite);

export default router;