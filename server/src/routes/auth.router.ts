import { Router } from "express";
import { validateLogin, validateSignup } from "@/middlewares/auth-validator";
import { AuthController } from "@/controllers/auth.controller";

const router = Router();

const signUp = [...validateSignup(), AuthController.signup];
const logIn = [...validateLogin(), AuthController.login];
const logOut = [AuthController.logOut];
const logAllOut = [AuthController.logAllOut];

export { signUp, logIn, logOut, logAllOut };
