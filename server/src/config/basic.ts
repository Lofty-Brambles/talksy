import { config } from "dotenv";

config();

export const PORT = +(process.env.PORT || 5000);

export const VALID_URLS = process.env
	.VALID_URLS!.split(",")
	.map(e => e.trim()) || ["http://localhost:3000/"];

export const JWT_SECRET = process.env.JWT_SECRET || "s3cr8";

export const TOKEN_AGE = +(process.env.TOKEN_AGE || 7200000);

export const HASH_SALT = +(process.env.HASH_SALT || 22);
