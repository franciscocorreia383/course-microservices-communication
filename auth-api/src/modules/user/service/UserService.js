import UserRepository from "../repository/UserRepository";
import * as httpStatus from '../../../config/constants/httpStatus'

class UserService {

    async findByEmail(req) {
        try {

            const { email } = req.params;
            this.validatenRequiredData(email);
            let user = UserRepository.findByEmail(email);

            if (!user) {

            }

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
                messege: error.status
            }
        }
    }

    validateRequiredData(email) {
        if (!email) {
            throw new Error('User email was not informed');
        }
    }
}

export default UserService;