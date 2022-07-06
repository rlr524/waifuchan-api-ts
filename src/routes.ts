import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import {createUserSchema} from "./schema/user.schema";
import config from "config";

function routes(app: Express) {
	app.get("/healthcheck", (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	app.post(
		`/api/${config.get<string>("apiVersion")}/users`, validateResource(createUserSchema), createUserHandler
	);
}

export default routes;
