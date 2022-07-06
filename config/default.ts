import dotenv from "dotenv";

dotenv.config();

const dbService = process.env.MONGODB_ACCOUNT;
const dbPass = process.env.MONGODB_PASS;

export default {
	port: 1337,
	server: "http://lancer",
	dbUri: `mongodb+srv://${dbService}:${dbPass}@cluster0.mdczd.mongodb.net/waifuchanDB?retryWrites=true&w=majority`,
	saltWorkFactor: 10,
	apiVersion: "v1",
	accessTokenTtl: "15m",
	refreshTokenTtl: "1y",
	accessTokenPrivateKey: ``,
	accessTokenPublicKey: ``,
	refreshTokenPrivateKey: ``,
	refreshTokenPublicKey: ``,
};
