// TODO: Needs work on the notification settings

import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			match: /^[a-z0-9_-]{1,32}$/gm,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
		},
		password: {
			type: String,
			trim: true,
			match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,
		},

		firstName: { type: String, required: true, trim: true, minLength: 1 },
		lastName: { type: String, required: true, trim: true, minLength: 1 },
		profilePictureURL: {
			type: String,
			trim: true,
			match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm,
		},
		bannerPictureURL: {
			type: String,
			trim: true,
			match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm,
		},
		bio: { type: String, trim: true, maxLength: 1000 },
		facebookID: { type: String, trim: true, required: false },

		friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
		friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
		reels: [{ type: Schema.Types.ObjectId, ref: "Reel" }],

		notificationSettings: {},
		viewSettings: {
			textIndent: {
				type: String,
				required: true,
				trim: true,
				lowercase: true,
				enum: ["s", "m", "l"],
			},
			justify: { type: Boolean, required: true },
			sans: { type: Boolean, required: true },
			darkMode: { type: Boolean, required: true },
		},
	},
	{ strict: true }
);

export type UserType = {
	username: string;
	email: string;
	password: string;

	firstName: string;
	secondName: string;
	profilePictureURL: string;
	bannerPictureURL: string;
	bio: string;
	facebookID: string;

	friends: Types.ObjectId[];
	friendRequests: Types.ObjectId[];
	posts: Types.ObjectId[];
	reels: Types.ObjectId[];

	notificationSettings: {};
	viewSettings: {
		textIndent: "s" | "m" | "l";
		justify: boolean;
		sans: boolean;
		darkMode: boolean;
	};
};

export const User = model<UserType>("User", UserSchema);
