import "express-async-errors";

import { Express } from "express";
import { mongoLoader } from "@/loaders/mongo-loader";
import { log } from "@/utils/logger";
import { expressLoader } from "./express-loader";

export const mainLoader = async (expressApp: Express) => {
	const mongoDb = await mongoLoader();
	log("DB loaded and connected!", "log");

	expressLoader(expressApp);
	log("Express app loaded!", "log");
};
