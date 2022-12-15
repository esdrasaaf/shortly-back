import { Router } from "express";
import { portUrl, getUrlById, getOpenShortUrl, deleteUrl } from "../controllers/urlsControllers.js";

const router = Router();

router.post("/urls/shorten", portUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", getOpenShortUrl);
router.delete("/urls/:id", deleteUrl);

export default router;