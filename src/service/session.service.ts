import SessionModel, { SessionDocument } from "../models/session.model";
import {FilterQuery, UpdateQuery} from "mongoose";
import {get} from "lodash";
import config from "config";
import { findUser } from "./user.service"
import { verifyJwt, signJwt} from "../utils/jwt.utils";

const refreshTokenPublicKey = config.get<string>("refreshTokenPublicKey")

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update)
}

export async function reissueAccessToken({refreshToken,}: {refreshToken: string}) {
    const { decoded } = verifyJwt(refreshTokenPublicKey);
    if (!decoded || !get(decoded, "session")) return false;
    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    return signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
}
