import bcrypt from 'bcrypt'
import User from '../../modules/user/model/User'

export async function CreateInitialData() {

    try {
        await User.sync({ force: true });

        let password = await bcrypt.hash('123456', 10);
    
        await User.create({
            name: 'User Teste1',
            email: 'testeuser1@gmail.com',
            password: password
        });

        await User.create({
            name: 'User Teste2',
            email: 'testeuser2@gmail.com',
            password: password
        });

    } catch (error) {
        console.log(error.message);
    }
}