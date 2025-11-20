import {
  serviceCreateLink,
  serviceGetAllLinks,
  serviceGetLinkStats,
  serviceDeleteLink,
} from "../services/links.service.js";

export const createLink = async (req, res) => {
  try {
    const data = await serviceCreateLink(req.body);
    res.json(data);
  } catch (err) {
    if (err.code === "P2002") {
      // Prisma unique constraint error
      return res.status(409).json({ error: "Code already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

export const getAllLinks = async (req, res) => {
  try {
    const data = await serviceGetAllLinks();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLinkStats = async (req, res) => {
  try {
    const data = await serviceGetLinkStats(req.params.code);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLink = async (req, res) => {
  try {
    await serviceDeleteLink(req.params.code);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
