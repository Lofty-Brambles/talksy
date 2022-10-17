import { model, Schema } from "mongoose";
import { CommentSchema, CommentType } from "@models/Comment";
import { UserType } from "@models/User";

export const ReelSchema = new Schema(
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
		title: { type: String, required: true, trim: true, minLength: 1 },
	},
	{ strict: true }
);

export type ReelType = {
	author: UserType;
	comments: CommentType[];
	reactions: {
		likes: number;
		hearts: number;
		laughs: number;
	};
	title: string;
};

export const Reel = model<ReelType>("Reel", ReelSchema);
