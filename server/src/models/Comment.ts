import { model, Schema } from "mongoose";
import { UserType } from "@/models/User";
import { PostType } from "@/models/Post";

export const CommentSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true,
		},
		root: { type: Schema.Types.Mixed, required: true },
		children: { type: [], required: true },

		reactions: {
			likes: { type: Number, default: 0, required: true, min: 0 },
			hearts: { type: Number, default: 0, required: true, min: 0 },
			laughs: { type: Number, default: 0, required: true, min: 0 },
		},
		description: { type: String, required: true, trim: true, minLength: 1 },
		asset: { type: String, trim: true },
	},
	{ strict: true }
);

export type CommentType = {
	author: UserType;
	root: any;
	children: any[];
	reactions: {
		likes: number;
		hearts: number;
		laughs: number;
	};
	description: string;
	asset: string;
};

export const Comment = model<CommentType>("Comment", CommentSchema);
