import { Router } from "express";
import getRanking from "../controllers/rankingControllers.js";

const router = Router();

// precisa usar left join
router.get("/ranking", getRanking);

export default router;