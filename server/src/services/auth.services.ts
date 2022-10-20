import "express-async-errors";

import { hash } from "bcryptjs";

import { HASH_SALT } from "@config/basic";
import { UserType } from "@models/User";

export class AuthService {
	static async hashPass(password: string) {
		return await hash(password, HASH_SALT);
	}

	static issueTokens(user: UserType) {
		
	}
}
