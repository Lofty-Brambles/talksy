import { urlencoded, json, static as expressStatic, Express } from "express";
import path from "path";

import logger from "morgan";
import compression from "compression";
import session from "express-session";
import helmet from "helmet";
import cors from "cors";

import { SESSION_SECRET, VALID_URLS } from "@/config";

export const expressLoader = (app: Express) => {
	// server health checker
	app.get("/status", (_, res) => {
		res.status(200).end();
	});

	// inits cors
	app.use(
		cors({
			origin: VALID_URLS,
			credentials: true,
		})
	);
	app.options("*", cors());

	// inits session
	app.use(
		session({
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: { secure: true },
		})
	);

	// loads assets and adds json
	app.use("/public", expressStatic(path.join(__dirname, "../", "public")));
	app.use(urlencoded({ extended: false }));
	app.use(json());

	// adds logger in dev
	if (app.get("env") === "development") {
		app.use(logger("dev"));
	}

	// adds compression and helmet in prod
	if (app.get("env") === "production") {
		app.use(compression());
		app.use(helmet());
	}
};
