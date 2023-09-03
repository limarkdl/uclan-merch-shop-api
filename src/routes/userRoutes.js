import express from 'express';
import userController from '../controllers/userController.js';
const userRouter = new express.Router();
import authentication from '../middleware/authentication.js';


userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/me', authentication, userController.getUser);
userRouter.put('/me', authentication, userController.updateUser);
userRouter.delete('/me', authentication, userController.deleteUser);

export default userRouter;
