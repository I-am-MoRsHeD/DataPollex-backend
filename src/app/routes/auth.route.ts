import express from 'express';
import {
    createUserHandler,
    getUserHandler
} from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/', createUserHandler);
authRouter.post('/login', getUserHandler);