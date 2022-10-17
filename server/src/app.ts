import express, { NextFunction, Request, Response } from "express";
import path from "path";

import createHttpError from "http-errors";
import cors from "cors";
import logger from "morgan";
import compression from "compression";
import helmet from "helmet";

import { Router } from "./routes";
import { HttpException } from "./types";

// init express
const app = express();

// statics primer
app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// adds cors middleware
app.use(
	cors({
		origin: process.env.VALID_URLS!.split(",").map(e => e.trim()),
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
app.use(
	(err: HttpException, req: Request, res: Response, next: NextFunction) => {
		res.locals.message = res.locals.error =
			req.app.get("env") === "development" ? err : {};

		// render error page
		res.status(err.status || 500);
		res.send("error");
	}
);

export { app };
