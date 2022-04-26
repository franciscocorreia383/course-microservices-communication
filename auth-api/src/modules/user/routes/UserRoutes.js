import { Router } from 'express'
import UserController from '../controller/UserController'
import checkToken from '../../../config/auth/checkToken'

const router = new Router();

router.post("/api/user/auth/", UserController.getAcessToken);

router.use(checkToken);

router.get("/api/user/email/:email", UserController.findByEmail);


export default router;