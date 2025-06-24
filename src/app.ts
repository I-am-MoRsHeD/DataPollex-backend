import express, { Application, Request, Response } from 'express';
import { authRouter } from './app/routes/auth.route';

export const app: Application = express();

app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/', async (req : Request, res : Response) => {
    res.send('Welcome to LMS');
});