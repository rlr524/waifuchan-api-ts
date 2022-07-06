import dotenv from "dotenv";
import express, {Request, Response} from "express";
import config from "config";
import responseTime from "response-time";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import { restResponseTimeHistogram, startMetricsServer} from "./utils/metrics";
import swaggerDocs from "./utils/swagger";

dotenv.config();

const app = express();

const port = config.get<number>("port");
const server = config.get<string>("server");

app.use(express.json());
app.use(deserializeUser);
app.use(responseTime((req: Request, res: Response, time: number) => {
	if (req?.route?.path) {
		restResponseTimeHistogram.observe({
			method: req.method,
			route: req.route.path,
			status_code: res.statusCode,
		},
			time * 1000
			)
	}
}))

app.listen(port, async () => {
	if (process.env.ENVIRONMENT == "dev") {
		logger.info(`App is running at http://localhost:${port}`);
	} else {
		logger.info(`App is running at ${server}:${port}`);
	}

	await connect();

	routes(app);

	startMetricsServer();

	swaggerDocs(app, port)
});
