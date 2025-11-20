import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links.routes.js";
import healthRoutes from "./routes/health.routes.js";
import prisma from "./utils/db.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,DELETE,PUT,OPTIONS",
  })
);

app.use(express.json());

// Correct order
app.use("/api/links", linksRoutes);
app.use("/healthz", healthRoutes); // <= MUST BE BEFORE REDIRECT ROUTE

// Redirect Route (keep at the end)
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      return res.status(404).send("Not found");
    }

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

export default app;
