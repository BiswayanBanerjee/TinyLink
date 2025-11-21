import { Router } from "express";
import prisma from "../utils/db.js";

const router = Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return res.status(404).json({ error: "Link not found" });
  }

  // Update click stats
  await prisma.link.update({
    where: { code },
    data: {
      totalClicks: link.totalClicks + 1,
      lastClicked: new Date(),
    },
  });

  // Redirect user
  return res.redirect(302, link.url);
});

export default router;
