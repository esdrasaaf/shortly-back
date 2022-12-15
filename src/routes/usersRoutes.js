import { Router } from "express";
import getUsers from "../controllers/usersControllers.js";

const router = Router();

router.get("/users/me", getUsers);

export default router;