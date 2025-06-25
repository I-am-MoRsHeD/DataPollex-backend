import express from 'express';
import { createCourseHandler, deleteCourseHandler, getAllCourses, getCourseWithModulesHandler, getModulesbyCourseIdHandler, getSingleCourseHandler, updateCourseHandler } from '../controllers/course.controller';

export const courseRouter = express.Router();

courseRouter.post('/', createCourseHandler);
courseRouter.get('/', getAllCourses);
// courseRouter.get('/modules', getCourseWithModulesHandler);
courseRouter.get('/:id/modules', getModulesbyCourseIdHandler);
courseRouter.get('/:id', getSingleCourseHandler);
courseRouter.patch('/:id', updateCourseHandler);
courseRouter.delete('/:id', deleteCourseHandler);