import express from 'express';
import { createCourseHandler, deleteCourseHandler, getAllCourses, getSingleCourseHandler, updateCourseHandler } from '../controllers/course.controller';

export const courseRouter = express.Router();

courseRouter.post('/', createCourseHandler);
courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getSingleCourseHandler);
courseRouter.patch('/:id', updateCourseHandler);
courseRouter.delete('/:id', deleteCourseHandler);