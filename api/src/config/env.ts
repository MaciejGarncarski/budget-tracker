import { z } from "zod";

import { httpLogger } from "../logger/logger.js";

const envSchema = z.object({
	HOST: z.string().ip({ version: "v4" }),
	APP_ORIGIN: z.string().startsWith("http"),
	PORT: z.string().length(4),
	NODE_ENV: z.union([z.literal("development"), z.literal("production")]).default("development"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	httpLogger.logger.error(parsedEnv.error.errors);
	process.exit(1);
}

export const env = parsedEnv.data;
