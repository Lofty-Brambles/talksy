import { model, Schema } from "mongoose";
import { CommentSchema, CommentType } from "@models/Comment";
import { UserType } from "@models/User";
import { feelingData } from "@utils/feeling-data";

const PostSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true,
		},
		comments: { type: [CommentSchema] },
		reactions: {
			likes: { type: Number, default: 0, required: true, min: 0 },
			hearts: { type: Number, default: 0, required: true, min: 0 },
			laughs: { type: Number, default: 0, required: true, min: 0 },
		},

		description: { type: String, required: true, trim: true, minLength: 1 },
		background: { type: Number, enum: [1, 2, 3, 4] },
		assets: { type: [String] },
		location: {
			type: String,
			trim: true,
			match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm,
		},
		tags: { type: Schema.Types.ObjectId, ref: "User", immutable: true },
		feelingTag: { type: String, enum: feelingData },
	},
	{ strict: true }
);

export type PostType = {
	author: UserType;
	comments: CommentType[];
	reactions: {
		likes: number;
		hearts: number;
		laughs: number;
	};
	description: string;
	background?: 1 | 2 | 3 | 4;
	assets?: string[];
	location?: string;
	tags: string[];
	feelingTag?: string;
};

export const Post = model<PostType>("Post", PostSchema);
