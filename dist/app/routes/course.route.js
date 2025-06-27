"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middlewares/multer");
const course_controller_1 = require("../controllers/course.controller");
exports.courseRouter = express_1.default.Router();
exports.courseRouter.post('/', multer_1.upload.single("thumbnail"), course_controller_1.createCourseHandler);
exports.courseRouter.get('/', course_controller_1.getAllCourses);
// courseRouter.get('/modules', getCourseWithModulesHandler);
exports.courseRouter.get('/:id/modules', course_controller_1.getModulesbyCourseIdHandler);
exports.courseRouter.get('/:id', course_controller_1.getSingleCourseHandler);
exports.courseRouter.patch('/:id', multer_1.upload.single("thumbnail"), course_controller_1.updateCourseHandler);
exports.courseRouter.delete('/:id', course_controller_1.deleteCourseHandler);
