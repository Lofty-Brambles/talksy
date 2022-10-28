import { Router } from "express";
import { authRouter } from "./auth.router";

export const routing = () => {
	const router = Router();

	authRouter(router);

	return router;
};
