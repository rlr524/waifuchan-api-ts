import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import {createUserSchema} from "./schema/user.schema";
import config from "config";
import {createUserSessionHandler, getUserSessionsHandler} from "./controller/session.controller";
import {createSessionSchema} from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

const apiVersion = config.get<string>("apiVersion");

function routes(app: Express) {
	app.get("/healthcheck", (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	app.post(
		`/api/${apiVersion}/users`, validateResource(createUserSchema), createUserHandler
	);

	app.post(`/api/${apiVersion}/sessions`, validateResource(createSessionSchema), createUserSessionHandler);

	app.get(`/api/${apiVersion}/sessions`, requireUser, getUserSessionsHandler);
}

export default routes;
