import "express-async-errors";

import { connect, connection } from "mongoose";
import { Db } from "mongodb";

import { MONGO_DB_URL } from "@/config";
import { log } from "@/utils/logger";

export const mongoLoader = async (): Promise<Db> => {
	await connect(MONGO_DB_URL);
	connection.on(
		"error",
		log.bind(log, "MongoDB Connection Error: ", "error")
	);
	return connection.db;
};
