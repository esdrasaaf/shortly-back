import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/authControllers.js";
import { signUpValidation, signInValidation } from "../middlewares/authMiddlewares.js";

const router = Router();

router.post("/signup", signUpValidation, postSignUp);
router.post("/signin", signInValidation, postSignIn);

export default router;