//# define HELLO Hello world !

import { logger } from "./utils/logger.js";

logger.info("HELLO");

//# ifdef DEV
logger.info("Started in dev mode.");
//# endif

//# ifdef RELEASE
logger.info("Started in release mode.");
//# endif