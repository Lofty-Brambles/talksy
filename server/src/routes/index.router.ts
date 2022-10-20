import { Router as ExpressRouter } from "express";
import { logIn, signUp } from "@routes/auth.router";

const router = ExpressRouter();

router.post("/auth/signup", ...signUp);
router.post("/auth/login", ...logIn);

export const Router = router;
