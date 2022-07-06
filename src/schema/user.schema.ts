import {object, string, TypeOf} from "zod";

/**
 * @description
 * Regex validation recipe for user password
 */
const pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$/;

/**
 * @module
 * @description
 * Use Zod to validate username, email, password (using regex recipe in the pwd const), and password confirmation,
 * then kneel before Zod.
 */
export const createUserSchema = object({
	body: object({
		name: string({
			required_error: "Name is required",
		}),
		email: string({
			required_error: "Email is required",
		}).email("Not a valid email"),
		password: string({
			required_error: "Password is required",
		}).regex(
			pwd,
			"Password must be a minimum of nine characters, contain at least one number, one uppercase " +
			"letter, and one lowercase letter"
		),
		passwordConfirmation: string({
			// Note the comparison of the confirmation hash to the original hash is also done in the user model
			required_error: "Password confirmation is required",
		})
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords do not match"
	})
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">
