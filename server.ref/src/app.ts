import express from "express";

import { mainLoader } from "@/loaders";
import { PORT } from "@/config";
import { log } from "./utils/logger";

const onInit = () => {
	log(
		`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   Server listening on port - ${PORT}
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`,
		"log"
	);
};

const onError = (error: NodeJS.ErrnoException) => {
	if (error.syscall !== "listen") throw error;
	switch (error.code) {
		case "EACCES":
			log(`Port ${PORT} requires elevated privileges.`, "error");
			process.exit(1);
		case "EADDRINUSE":
			log(`Port ${PORT} is already in use.`, "error");
			process.exit(1);
		default:
			throw error;
	}
};

const serverStart = async () => {
	const app = express();
	await mainLoader(app);
	app.listen(PORT, onInit).on("error", onError);
};

serverStart();
