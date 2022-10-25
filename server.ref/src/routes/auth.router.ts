import { Router } from "express";

export const authRouter = (router: Router) => {
	router.post("/signup");
};
