import express from "express";
import cors from "cors";

import auditRoutes from "./routes/auditRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Page Pulse API is running 🚀",
  });
});

app.use("/api/audit", auditRoutes);

export default app;