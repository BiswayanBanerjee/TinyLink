import { Router } from "express";
import prisma from "../utils/db.js";

const router = Router();

router.get("/", async (req, res) => {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  let dbStatus = "unknown";
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "connected";
  } catch (e) {
    dbStatus = "error";
  }

  res.status(200).json({
    ok: true,
    version: "1.0.0",
    uptime,
    timestamp,
    dbStatus
  });
});

export default router;
