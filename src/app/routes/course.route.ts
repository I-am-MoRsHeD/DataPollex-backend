import express from 'express';
import { upload } from '../middlewares/multer';
import { createCourseHandler, deleteCourseHandler, getAllCourses, getCourseWithModulesHandler, getModulesbyCourseIdHandler, getSingleCourseHandler, updateCourseHandler } from '../controllers/course.controller';

export const courseRouter = express.Router();

courseRouter.post('/', upload.single("thumbnail"), createCourseHandler);
courseRouter.get('/', getAllCourses);
// courseRouter.get('/modules', getCourseWithModulesHandler);
courseRouter.get('/:id/modules', getModulesbyCourseIdHandler);
courseRouter.get('/:id', getSingleCourseHandler);
courseRouter.patch('/:id', upload.single("thumbnail"), updateCourseHandler);
courseRouter.delete('/:id', deleteCourseHandler);