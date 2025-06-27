import express from 'express';
import { createLectureHandler, deleteLectureHandler, getAllLecturesHandler, updateLectureHandler } from '../controllers/lecture.controller';
import { upload } from '../middlewares/multer';

export const lectureRouter = express.Router();

lectureRouter.post('/', upload.single("pdfNotes"), createLectureHandler);
lectureRouter.get('/', getAllLecturesHandler);
lectureRouter.patch('/:id', upload.single("pdfNotes"), updateLectureHandler);
lectureRouter.delete('/:id', deleteLectureHandler);