import express, { Application, Request, Response } from 'express';
import { authRouter } from './app/routes/auth.route';
import { courseRouter } from './app/routes/course.route';
import { moduleRouter } from './app/routes/module.route';
import { lectureRouter } from './app/routes/lecture.route';

export const app: Application = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/course', courseRouter);
app.use('/api/module', moduleRouter);
app.use('/api/lecture', lectureRouter);

app.get('/', async (req : Request, res : Response) => {
    res.send('Welcome to LMS');
});