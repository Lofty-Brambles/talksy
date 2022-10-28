import { config } from "dotenv";

config();

export const PORT = +(process.env.PORT || 3000);

export const DB_URL = process.env.DB_URL!;

export const SERVER_PREFIX = process.env.SERVER_PREFIX || "/api";

export const VALID_URLS = process.env
	.VALID_URLS!.split(",")
	.map(e => e.trim()) || ["http://localhost:3000/"];

export const SESSION_SECRET = process.env.SESSION_SECRET || "s3ss10ns3c8";

export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID!;

export const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET!;

export const FACEBOOK_CALLBACK_URL = `${VALID_URLS[0]}/api/auth/facebook/callback`;
