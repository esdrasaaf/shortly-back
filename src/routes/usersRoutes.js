import { Router } from "express";
import getUsers from "../controllers/usersControllers.js";
import getUserValidation from "../middlewares/usersMiddlewares.js";

const router = Router();

router.get("/users/me", getUserValidation, getUsers);

export default router;