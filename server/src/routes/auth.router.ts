import { Router } from "express";
import { validateLogin, validateSignup } from "@middlewares/validator";
import { AuthController } from "@controllers/auth.controller";

const router = Router();

const signUp = [...validateSignup(), AuthController.signup];
const logIn = [...validateLogin(), AuthController.login];
router.post("/logout/current");
router.post("/logout/all");

export { signUp, logIn };
