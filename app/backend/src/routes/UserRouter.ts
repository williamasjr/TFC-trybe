import { Router } from 'express';
import LoginValidate from '../middlewares/LoginValidate';
import UserController from '../controllers/UserController';
import LoginValidateRegex from '../middlewares/LoginValidateRegex';
import TokenValidate from '../middlewares/TokenValidate';

const userRouter = Router();
userRouter.post('/', LoginValidate, LoginValidateRegex, UserController.findUser);
userRouter.get('/role', TokenValidate, UserController.findRole);

export default userRouter;
