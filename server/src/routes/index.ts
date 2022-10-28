import "express-async-errors";

import { Router } from "express";

import { authRouter } from "@/routes/auth.router";

export const routing = () => {
	const router = Router();

	authRouter(router);

	return router;
};
