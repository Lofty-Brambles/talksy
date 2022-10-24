import "express-async-errors";

import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { ACCESSORS, REFRESHERS, HASH_SALT } from "@/config/basic";
import { UserType } from "@/models/User";
import { Types } from "mongoose";

export class AuthService {
	static async hashPass(password: string) {
		return await hash(password, HASH_SALT);
	}

	static async comparePass(password: string, userPassword: string) {
		return await compare(password, userPassword);
	}

	static generateAccessToken(_id: Types.ObjectId) {
		return sign({ _id }, ACCESSORS.PRIVATE_KEY, {
			algorithm: "RS256",
			expiresIn: ACCESSORS.LIFE,
		});
	}

	static generateRefreshToken(_id: Types.ObjectId) {
		return sign({ _id }, REFRESHERS.PRIVATE_KEY, {
			algorithm: "RS256",
			expiresIn: REFRESHERS.LIFE,
		});
	}

	static purifyUser(user: UserType) {
		const { password, sessions, ...purifiedUser } = user;
		return purifiedUser;
	}
}
