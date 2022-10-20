import { Router as ExpressRouter } from "express";
import { authRouter } from "@routes/auth.router";

const router = ExpressRouter();

router.use("/auth", authRouter);

export const Router = router;
