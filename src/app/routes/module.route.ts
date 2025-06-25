import express from 'express';
import { createModuleHandler, deleteModuleHandler, getAllModules, getLectureByModuleIdHandler, updateModuleHandler } from '../controllers/module.controller';

export const moduleRouter = express.Router();


moduleRouter.post('/', createModuleHandler);
moduleRouter.get('/', getAllModules);
moduleRouter.get('/:id/lectures', getLectureByModuleIdHandler);
// moduleRouter.get('/:id', getSingleCourseHandler);
moduleRouter.patch('/:id', updateModuleHandler);
moduleRouter.delete('/:id', deleteModuleHandler);
