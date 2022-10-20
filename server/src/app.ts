import express from "express";
import path from "path";

import createHttpError from "http-errors";
import cors from "cors";
import logger from "morgan";
import compression from "compression";
import helmet from "helmet";

import "express-async-errors";

import { Router } from "./routes/index.router";
import { VALID_URLS } from "@config/basic";
import { errorHandler } from "@middlewares/error-handler";

// init express
const app = express();

// statics primer
app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// adds cors middleware
app.use(
	cors({
		origin: VALID_URLS,
		credentials: true,
	})
);
app.options("*", cors());

// logger
if (app.get("env") === "development") {
	app.use(logger("dev"));
}

// security
if (app.get("env") === "production") {
	app.use(compression());
	app.use(helmet());
}

// adds base routing
app.use("/api", Router);

// catch 404 and fwd
app.use((req, res, next) => {
	next(createHttpError(404));
});

// error handler
app.use(errorHandler);

export { app };
