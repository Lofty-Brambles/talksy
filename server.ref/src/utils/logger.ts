import chalk from "chalk";

export const log = (
	content: string,
	type: "log" | "warn" | "error" | "debug" | "ready" = "log"
) => {
	const time = new Date();

	const padStartTwice = (num: number) => num.toString().padStart(2, "0");

	// Formats: [YYYY-MM-DD HH:MM:SS]
	const timeFMT = `[${chalk.cyan(
		`${time.getFullYear()}-${padStartTwice(
			time.getMonth() + 1
		)}-${padStartTwice(time.getDate())} ${padStartTwice(
			time.getHours()
		)}:${padStartTwice(time.getMinutes())}:${padStartTwice(
			time.getSeconds()
		)}`
	)}]`;

	switch (type) {
		case "log":
			return console.log(
				`${timeFMT} ${chalk.gray(type.toUpperCase())}: ${content} `
			);
		case "warn":
			return console.log(
				`${timeFMT} ${chalk.yellow(type.toUpperCase())}: ${content} `
			);
		case "error":
			return console.log(
				`${timeFMT} ${chalk.red(type.toUpperCase())}: ${content} `
			);
		case "debug":
			return console.log(
				`${timeFMT} ${chalk.magenta(type.toUpperCase())}: ${content} `
			);
		case "ready":
			return console.log(
				`${timeFMT} ${chalk.green(type.toUpperCase())}: ${content}`
			);
		default:
			throw new TypeError(
				"Logger type must be either warn, debug, log, ready, cmd or error."
			);
	}
};
