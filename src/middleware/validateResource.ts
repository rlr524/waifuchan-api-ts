import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

/**
 * @description
 * Use of currying here to execute the validate function with the schema inside of middleware and
 * return another function taking the req, res, and next (an express route call) and validate the
 * req object against the schema.
 */
const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
		} catch (error: any) {
			return res.status(400).send(error.errors);
		}
	};

export default validate;
