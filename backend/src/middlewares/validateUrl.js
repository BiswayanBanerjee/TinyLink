export default function validateUrl(req, res, next) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    new URL(url);

    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid URL format" });
  }
}
