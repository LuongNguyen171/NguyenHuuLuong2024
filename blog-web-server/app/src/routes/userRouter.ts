import express from 'express';
import { getAllUsers, login } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/login', login);

export default userRouter;
