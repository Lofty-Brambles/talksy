import { Router as ExpressRouter } from "express";
import { logAllOut, logIn, logOut, signUp } from "@/routes/auth.router";

const router = ExpressRouter();

router.post("/auth/signup", ...signUp);
router.post("/auth/login", ...logIn);
router.post("/auth/logout/current", ...logOut);
router.post("/auth/logout/all", ...logAllOut);

export const Router = router;
