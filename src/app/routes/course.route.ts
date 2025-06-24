import express from 'express';
import { createCourseHandler } from '../controllers/course.controller';

export const courseRouter = express.Router();

courseRouter.post('/', createCourseHandler);
// courseRouter.get('/');
// courseRouter.put('/');
// courseRouter.delete('/');