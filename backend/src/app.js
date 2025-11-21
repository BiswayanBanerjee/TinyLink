import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links.routes.js";
import healthRoutes from "./routes/health.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";   // ⭐ ADD THIS
import prisma from "./utils/db.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,DELETE,PUT,OPTIONS",
  })
);

app.use(express.json());

// Order is IMPORTANT
app.use("/api/links", linksRoutes);
app.use("/healthz", healthRoutes);

// ⭐ Add redirect route handler here
app.use("/", redirectRoutes);   // ⭐ THIS LINE

export default app;
