import express from 'express';
import { createLectureHandler, deleteLectureHandler, getAllLecturesHandler, updateLectureHandler } from '../controllers/lecture.controller';

export const lectureRouter = express.Router();

lectureRouter.post('/', createLectureHandler);
lectureRouter.get('/', getAllLecturesHandler);
// lectureRouter.get('/:id', getSingleCourseHandler);
lectureRouter.patch('/:id', updateLectureHandler);
lectureRouter.delete('/:id', deleteLectureHandler);