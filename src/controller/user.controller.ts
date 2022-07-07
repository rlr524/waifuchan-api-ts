import {Request, Response} from "express";
import {createUser} from "../service/user.service";
import logger from "../utils/logger";
import {CreateUserInput} from "../schema/user.schema";

/**
 * @module
 * @param req
 * @param res
 */
export async function createUserHandler(req: Request<Record<string, never>, Record<string, never>, CreateUserInput["body"]>, res: Response) {
	try {
		const user = await createUser(req.body)
		return res.send({
			message: `User [${user.email}] created with user id: ${user._id}`,
		})
	} catch (e: any) {
		logger.error(e);
		return res.status(409).send(e.message);
	}
}
