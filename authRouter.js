import {Router} from 'express';
import authController from './authController.js';
const authRouter = Router();


authRouter.post('/register', authController.registration);

authRouter.post('/login', authController.login);

authRouter.get('/users', authController.getUsers);

export default authRouter;