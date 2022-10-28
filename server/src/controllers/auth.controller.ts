import "express-async-errors";

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { AuthServices } from "@/services/auth.services";
import { BadRequest, Conflict } from "@/utils/err-classes";
import { User } from "@/models/User";
import passport from "passport";

export class AuthController {
	static async signup(req: Request, res: Response) {
		const validations = validationResult(req);
		if (!validations.isEmpty())
			throw new BadRequest("Validation Errors: ", validations.array());

		const {
			username,
			email,
			password,
			firstName,
			lastName,
			profilePictureURL,
			bannerPictureURL,
		} = req.body;

		const exists = await User.findOne({ email });
		if (exists)
			throw new Conflict(
				"The Email already has an account attached to it."
			);

		const hashedPassword = AuthServices.hashPass(password);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			firstName,
			lastName,
			profilePictureURL,
			bannerPictureURL,
		});

		await newUser.save();
		return res.status(200).json({
			message: "The User is successfully registered!",
			image: "https://httpcats.com/200.jpg",
		});
	}

	static login() {
		return [
			(req: Request, _: Response) => {
				const validations = validationResult(req);
				if (!validations.isEmpty())
					throw new BadRequest(
						"Validation Errors: ",
						validations.array()
					);
			},
			passport.authenticate("local"),
			(req: Request, res: Response) =>
				res.status(200).json({
					message: "User logged in successfully!",
					image: "https://httpcats.com/200.jpg",
					user: req.user,
				}),
		];
	}

	static logout(req: Request, res: Response, next: NextFunction) {
		req.logout(err => {
			if (err) return next(err);
			res.status(204).json({
				message: "User logged out successfully!",
				image: "https://httpcats.com/204.jpg",
			});
		});
	}

	static facebookLogin() {
		return passport.authenticate("facebook");
	}

	static facebookLoginCallback() {
		return [
			passport.authenticate("facebook"),
			(req: Request, res: Response) =>
				res.status(200).json({
					message: "User logged in successfully!",
					image: "https://httpcats.com/200.jpg",
					user: req.user,
				}),
		];
	}
}
