import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserRepository from "../repository/UserRepository";
import * as httpStatus from '../../../config/constants/httpStatus'
import * as secrets from '../../../config/constants/secrets'
import UserException from '../exception/UserException'

class UserService {

    async findByEmail(req) {
        try {
            const email = req.params.email;
            this.validatenRequiredData(email);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);

            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }

        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.status
            }
        }
    }

    validatenRequiredData(email) {
        if (!email) {
            throw new UserException(httpStatus.BAD_REQUEST, 'User email was not informed');
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new Error(httpStatus.NOT_FOUND, "User was not found.")
        }
    }

    async getAcessToken(req) {
        try {
            const { email, password } = req.body;
            this.validateAcessTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            const accessToken = jwt.sign({authUser}, secrets.API_SECRETS ,{expiresIn: '1d'});
            return{
                status: httpStatus.SUCCESS,
                accessToken,
            }
        } catch (error) {
            console.log(error.message);
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.status
            }
        }

    }

    validateAcessTokenData(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.UNAUTHORAZED, "Email and password must be informed.")
        }
    }

    async validatePassword(password, hashPassword){
        if (!await bcrypt.compare(password, hashPassword)) {
            throw new UserException(httpStatus.UNAUTHORAZED, "Password doesn't match.");
        }
    }
}

export default new UserService();