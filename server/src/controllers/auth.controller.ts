import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Document, Types } from "mongoose";

import { AuthService } from "@/services/auth.services";
import { User, UserType } from "@/models/User";
import {
	BadRequest,
	Conflict,
	NotFound,
	Unauthorized,
} from "../types-n-classes";
import { ACCESSORS, REFRESHERS } from "@/config/basic";

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

		let user:
			| (Document<unknown, any, UserType> &
					UserType & {
						_id: Types.ObjectId;
					})
			| null;
		const { usernameOrEmail, password } = req.body;
		if (/@/g.test(usernameOrEmail))
			user = await User.findOne({ email: usernameOrEmail });
		else user = await User.findOne({ username: usernameOrEmail });

		if (user !== null) {
			const isPasswordValid = await AuthService.comparePass(
				password,
				user?.password as string
			);
			if (!isPasswordValid)
				throw new Unauthorized("Wrong password entered.");

			const accesstoken = AuthService.generateAccessToken(user._id);
			const refreshtoken = AuthService.generateRefreshToken(user._id);

			user.sessions = [...(user as UserType).sessions, refreshtoken];
			await user.save();

			res.cookie("accessToken", accesstoken, {
				maxAge: ACCESSORS.LIFE_IN_MS,
				httpOnly: true,
			});

			res.cookie("refreshToken", refreshtoken, {
				maxAge: REFRESHERS.LIFE_IN_MS,
				httpOnly: true,
			});

			return res.status(200).json({
				message: "User logged in successfully!",
				image: "https://httpcats.com/200.jpg",
				user: AuthService.purifyUser(user),
			});
		}
	}

	static async logOut(req: Request, res: Response) {
		const { _id } = res.locals.user;
		const user = await User.findOne({ _id });

		if (user === null) throw new NotFound("The user does not exist.");
		const { refreshToken } = req.cookies;
		user.sessions = user.sessions.filter(e => e !== refreshToken);
		await user.save();

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		return res.status(200).json({
			message: "User logged out successfully!",
			image: "https://httpcats.com/200.jpg",
		});
	}

	static async logAllOut(req: Request, res: Response) {
		const { _id } = res.locals.user;
		const user = await User.findById(_id, { sessions: [] }, { new: true });
		if (user === null) throw new NotFound("The user does not exist.");

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		return res.status(200).json({
			message: "User was logged out entirely, successfully!",
			image: "https://httpcats.com/200.jpg",
		});
	}
}
