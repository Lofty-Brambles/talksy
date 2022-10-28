import "express-async-errors";

import { body } from "express-validator";
import { hash, verify } from "argon2";

import { UserType } from "@/models/User";

export class AuthServices {
	static signupValidation() {
		return [
			body("username")
				.trim()
				.isLength({ min: 1 })
				.escape()
				.withMessage("An username is required."),
			body("email")
				.trim()
				.isEmail()
				.escape()
				.withMessage("A proper email address is required."),
			body("password")
				.isLength({ min: 1 })
				.custom((input: string) => {
					if (
						/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm.test(
							input
						)
					)
						return false;
					return true;
				})
				.escape()
				.withMessage(
					"Password must have atleast 8 characters, both uppercase and lowercase, along with a number and a special character."
				),
			body("firstName")
				.trim()
				.isEmail()
				.escape()
				.withMessage("A first name is required."),
			body("lastName")
				.trim()
				.isEmail()
				.escape()
				.withMessage("A last name is required."),
			body("profilePictureURL")
				.trim()
				.escape()
				.custom((input: string) => {
					if (
						/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm.test(
							input
						)
					)
						return false;
					return true;
				})
				.withMessage("A proper profile image URL is required."),
			body("bannerPictureURL")
				.trim()
				.escape()
				.custom((input: string) => {
					if (
						/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm.test(
							input
						)
					)
						return false;
					return true;
				})
				.withMessage("A proper banner image URL is required."),
		];
	}

	static async hashPass(pass: string) {
		return await hash(pass);
	}

	static async comparePass(hash: string, userPassword: string) {
		return await verify(hash, userPassword);
	}

	static loginValidation() {
		return [
			body("usernameOrEmail")
				.trim()
				.custom((input: string) => {
					if (
						/^[a-z0-9_-]{1,30}$/gm.test(input) ||
						/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm.test(input)
					)
						throw new Error("The Username or Email is invalid.");
					return true;
				})
				.escape()
				.withMessage("A correct Username/Email is required."),
			body("password").trim().isLength({ min: 1 }).trim(),
		];
	}

	static purifyUser(user: UserType) {
		const { password, facebookID, ...purifiedUser } = user;
		return purifiedUser;
	}
}
