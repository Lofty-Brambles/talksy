import "express-async-errors";

import { Express } from "express";
import createHttpError from "http-errors";

import { routing } from "@/routes";
import { errorHandler } from "@/utils/error-handler";
import { SERVER_PREFIX } from "@/config";

export const routeLoader = (app: Express) => {
	// adds the routes
	app.use(SERVER_PREFIX, routing());

	// catch 404 and fwd
	app.use((_, __, next) => {
		next(createHttpError(404));
	});

	// error handler
	app.use(errorHandler);
};
