import dotenv from "dotenv";
import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

dotenv.config();
const app = express();
const port = config.get<number>("port");
const server = config.get<string>("server");
app.use(express.json());

app.listen(port, async () => {
	if (process.env.ENVIRONMENT == "dev") {
		logger.info(`App is running at http://localhost:${port}`);
	} else {
		logger.info(`App is running at ${server}:${port}`);
	}

	await connect();

	routes(app);
});
