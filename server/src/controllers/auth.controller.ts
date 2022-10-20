import { AuthService } from "@services/auth.services";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { User } from "@models/User";
import { BadRequest, Conflict } from "src/types-n-classes";

export class AuthController {
	static async signup(req: Request, res: Response) {
		const validations = validationResult(req);
		if (!validations.isEmpty())
			throw new BadRequest("Validation Errors", validations.array());

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

		const hashedPassword = AuthService.hashPass(password);
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

	static async login(req: Request, res: Response) {
		const validations = validationResult(req);
		if (!validations.isEmpty())
			throw new BadRequest("Validation Errors", validations.array());

		let user = true;
		const { usernameOrEmail, password } = req.body;
		if (/@/g.test(usernameOrEmail)) user = User.findOne({ username });
		else ;
	}
}
