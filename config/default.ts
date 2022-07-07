import dotenv from "dotenv";

dotenv.config();

const dbService = process.env.MONGODB_ACCOUNT;
const dbPass = process.env.MONGODB_PASS;

export default {
	port: 1337,
	server: "http://lancer",
	environment: process.env.ENVIRONMENT,
	dbUri: `mongodb+srv://${dbService}:${dbPass}@cluster0.mdczd.mongodb.net/waifuchanDB?retryWrites=true&w=majority`,
	saltWorkFactor: 10,
	apiVersion: "v1",
	accessTokenTtl: "15m",
	refreshTokenTtl: "1y",
	accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
	accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
	refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
	refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
};
