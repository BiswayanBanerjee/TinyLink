import { Router } from "express";
import {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
} from "../controllers/links.controller.js";
import validateUrl from "../middlewares/validateUrl.js";

const router = Router();

router.post("/", validateUrl, createLink);
router.get("/", getAllLinks);
router.get("/:code", getLinkStats);
router.delete("/:code", deleteLink);

export default router;
