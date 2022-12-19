import { Router } from "express";
import { postSignIn,  postSignUp } from "../controllers/authControllers.js";
import { signUpValidation } from "../middlewares/authMiddlewares.js";

const router = Router();

router.post("/signup", signUpValidation, postSignUp);
router.post("/signin", postSignIn);

export default router;