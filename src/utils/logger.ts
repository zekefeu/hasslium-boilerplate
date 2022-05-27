import pino from "pino";
import { packageJson } from "./utils.js";

// Define transport options

// In dev mode, output the prettified log to stdout
let transportOptions: pino.TransportSingleOptions = {
	target: "pino-pretty",
	options: {
		translateTime: true,
		ignore: "pid,hostname"
	}
};

// If in release mode, log to a file
//# ifdef RELEASE
transportOptions = {
	target: "pino/file",
	options: {
		destination: `${packageJson.name}@${packageJson.version}.log`
	}
};
//# endif

// Create logger with defined transport options
export const logger = pino(pino.transport(transportOptions));

//# ifdef DEV
logger.info(`${packageJson.name}@${packageJson.version} | Dev mode`);
//# else
logger.info(`${packageJson.name}@${packageJson.version}`);
//# endif