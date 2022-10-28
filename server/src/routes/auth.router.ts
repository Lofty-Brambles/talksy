import { AuthController } from "@/controllers/auth.controller";
import { AuthServices } from "@/services/auth.services";
import { Router } from "express";

export const authRouter = (router: Router) => {
	router.post(
		"/auth/signup",
		...AuthServices.signupValidation(),
		AuthController.signup
	);
	router.post(
		"/auth/login",
		...AuthServices.loginValidation(),
		...AuthController.login()
	);
	router.post("/auth/logout", AuthController.logout);

	router.post("/auth/facebook", AuthController.facebookLogin());
	router.get(
		"/auth/facebook/callback",
		...AuthController.facebookLoginCallback()
	);
};
