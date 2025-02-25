import cors from "cors";

import { env } from "../config/env.js";

export const corsMiddleware = () => {
	const middleware = cors({
		origin: env.APP_ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	});

	return middleware;
};
