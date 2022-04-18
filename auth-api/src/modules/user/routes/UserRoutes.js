import { Router } from 'express'
import UserController from '../controller/UserController'

const router = new Router();

router.get("/api/user/email/:email", UserController.findByEmail);
router.post("/api/user/auth/", UserController.getAcessToken);

export default router;