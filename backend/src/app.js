import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

import prisma from "./utils/db.js";

// Redirect Route
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      return res.status(404).send("Not found");
    }

    // increment click count
    await prisma.link.update({
      where: { code },
      data: {
        totalClicks: { increment: 1 },
        lastClicked: new Date(),
      },
    });

    return res.redirect(302, link.url);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});


app.use(cors());
app.use(express.json());

// Routes
app.use("/api/links", linksRoutes);
app.use("/healthz", healthRoutes);

export default app;
