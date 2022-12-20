import { Router } from "express";
import { portUrl, getUrlById, getOpenShortUrl, deleteUrl } from "../controllers/urlsControllers.js";
import { deleteValidation, getByIdValidation, openShortValidation, shortenValidation } from "../middlewares/urlsMiddlewares.js";

const router = Router();

router.post("/urls/shorten", shortenValidation, portUrl);
router.get("/urls/:id", getByIdValidation, getUrlById);
router.get("/urls/open/:shortUrl", openShortValidation, getOpenShortUrl);
router.delete("/urls/:id", deleteValidation, deleteUrl);

export default router;