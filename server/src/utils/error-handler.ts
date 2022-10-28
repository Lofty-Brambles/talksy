import { NextFunction, Request, Response } from "express";
import { HttpException } from "./err-classes";
import { log } from "./logger";

export const errorHandler = (
	err: HttpException,
	req: Request,
	res: Response,
	_: NextFunction
) => {
	if (err instanceof HttpException)
		return res.status(err.status).json({
			error: {
				code: err.status,
				message: err.message,
				details: err,
			},
		});

	log(JSON.stringify(err, null, 4), "error");

	return res.status(500).json({
		error: {
			code: 500,
			message: "Something went wrong",
			image: "https://httpcats.com/500.jpg",
			details: req.app.get("env") === "development" ? err : "N/A.",
		},
	});
};
