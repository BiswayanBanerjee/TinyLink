import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links.routes.js";
import healthRoutes from "./routes/health.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";   
import prisma from "./utils/db.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,DELETE,PUT,OPTIONS",
  })
);

app.use(express.json());


app.use("/api/links", linksRoutes);
app.use("/healthz", healthRoutes);


app.use("/", redirectRoutes);   

export default app;
