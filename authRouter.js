import {Router} from 'express';
import authController from './authController.js';
const authRouter = Router();
import {check} from 'express-validator';
import roleMiddleware from "./middleware/roleMiddleware.js";

authRouter.post('/register',[
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be longer than 4 and shorter than 10 characters').isLength({min: 4, max: 10}),
    check('email', 'Email is not valid').isEmail()
], authController.registration);

authRouter.post('/login', authController.login);

authRouter.get('/users', roleMiddleware(['ADMIN']), authController.getUsers);

export default authRouter;