"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureRouter = void 0;
const express_1 = __importDefault(require("express"));
const lecture_controller_1 = require("../controllers/lecture.controller");
const multer_1 = require("../middlewares/multer");
exports.lectureRouter = express_1.default.Router();
exports.lectureRouter.post('/', multer_1.upload.single("pdfNotes"), lecture_controller_1.createLectureHandler);
exports.lectureRouter.get('/', lecture_controller_1.getAllLecturesHandler);
exports.lectureRouter.patch('/:id', multer_1.upload.single("pdfNotes"), lecture_controller_1.updateLectureHandler);
exports.lectureRouter.delete('/:id', lecture_controller_1.deleteLectureHandler);
