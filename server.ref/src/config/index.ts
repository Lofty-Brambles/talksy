import { config } from "dotenv";

config();

export const PORT = +(process.env.PORT || 5000);

export const DB_URL = process.env.DB_URL!;

export const SERVER_PREFIX = process.env.SERVER_PREFIX || "/api";

export const VALID_URLS = process.env
	.VALID_URLS!.split(",")
	.map(e => e.trim()) || ["http://localhost:3000/"];

export const HASH_SALT = +(process.env.HASH_SALT || 22);

export const ACCESSORS = {
	PRIVATE_KEY: process.env.ACCESSORS_PRIVATE_KEY || "0cc3ss0rsprv8k3",
	LIFE: process.env.ACCESSORS_LIFE || "2h",
	LIFE_IN_MS: +(process.env.ACCESSORS_LIFE_IN_MS || 7200000),
};

export const REFRESHERS = {
	PRIVATE_KEY: process.env.REFRESHERS_PRIVATE_KEY || "r3fr8rsprv8k3",
	LIFE: process.env.REFRESHERS_LIFE || "1d",
	LIFE_IN_MS: +(process.env.ACCESSORS_LIFE_IN_MS || 86400000),
};
