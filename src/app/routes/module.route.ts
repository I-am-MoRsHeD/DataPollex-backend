import express from 'express';
import { createModuleHandler, deleteModuleHandler, getAllModules, getLectureByModuleIdHandler, getSingleModuleHandler, updateModuleHandler } from '../controllers/module.controller';

export const moduleRouter = express.Router();


moduleRouter.post('/', createModuleHandler);
moduleRouter.get('/', getAllModules);
moduleRouter.get('/:id/lectures', getLectureByModuleIdHandler);
moduleRouter.get('/:id', getSingleModuleHandler);
moduleRouter.patch('/:id', updateModuleHandler);
moduleRouter.delete('/:id', deleteModuleHandler);
