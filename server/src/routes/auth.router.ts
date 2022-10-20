import { Router } from "express";
import { validateLogin, validateSignup } from "@middlewares/validator";
import { AuthController } from "@controllers/auth.controller";

const router = Router();

router.post("/signup", ...validateSignup(), AuthController.signup);
router.post("/login", ...validateLogin(), AuthController.login);
router.post("/logout/current");
router.post("/logout/all");

export const authRouter = router;
