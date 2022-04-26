import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import * as secrets from '../constants/secrets'
import * as httpStatus from '../constants/httpStatus'
import AuthException from './AcessTokenException'

const emptySpace = " "
const baerer = "baerer";

export default async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new AuthException(httpStatus.UNAUTHORAZED, "Access token was not informed.");
        }

        let accessToken = authorization;
        if (accessToken.includes(baerer)) {
            accessToken = accessToken.replace(emptySpace)[1];
        }

        const decoded = await promisify(jwt.verify)(accessToken, secrets.API_SECRETS);
        req.authUser = decoded.authUser;

        return next();

    } catch (error) {
        const status = error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({ status, message: error.message });
    }
}