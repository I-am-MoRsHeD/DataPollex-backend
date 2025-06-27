"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseHandler = exports.updateCourseHandler = exports.getSingleCourseHandler = exports.getModulesbyCourseIdHandler = exports.getCourseWithModulesHandler = exports.getAllCourses = exports.createCourseHandler = void 0;
require("dotenv/config");
const course_service_1 = require("../services/course.service");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const createCourseHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, description } = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: "Image is required" });
        }
        const imageUrl = yield new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: "image",
                folder: "courses",
            }, (error, result) => {
                if (error || !result) {
                    reject(error);
                }
                else {
                    resolve(result.secure_url);
                }
            });
            stream.end(file === null || file === void 0 ? void 0 : file.buffer);
        });
        const courseDetails = {
            title,
            price: Number(price),
            description,
            thumbnail: imageUrl,
        };
        // const validated = await CourseZodSchema.parseAsync(courseDetails);
        const newCourse = yield (0, course_service_1.createCourse)(courseDetails);
        res.status(201).json({ success: true, message: "Course created successfully", data: newCourse });
    }
    catch (error) {
        console.error("Course creation failed:", error);
        res.status(400).json({ success: false, message: "Course creation failed", error });
    }
});
exports.createCourseHandler = createCourseHandler;
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield (0, course_service_1.getCourses)();
        res.status(200).json({
            success: true,
            message: 'Courses fetched successfully',
            data: courses
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Courses fetch failed',
            error
        });
    }
});
exports.getAllCourses = getAllCourses;
const getCourseWithModulesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseWithModules = yield (0, course_service_1.getCourseWithModules)();
        res.status(200).json({
            success: true,
            message: 'Course with modules fetched successfully',
            data: courseWithModules
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Modules fetch failed",
            error
        });
    }
});
exports.getCourseWithModulesHandler = getCourseWithModulesHandler;
const getModulesbyCourseIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, course_service_1.getModulesbyCourseId)(req.params.id);
        res.status(200).json({
            success: true,
            message: "Modules fetched successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Modules fetch failed",
            error
        });
    }
});
exports.getModulesbyCourseIdHandler = getModulesbyCourseIdHandler;
const getSingleCourseHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield (0, course_service_1.getSingleCourse)(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Course fetched successfully',
            data: course
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Course fetch failed',
            error
        });
    }
});
exports.getSingleCourseHandler = getSingleCourseHandler;
const updateCourseHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, description } = req.body;
        const file = req.file;
        const imageUrl = yield new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: "image",
                folder: "courses",
            }, (error, result) => {
                if (error || !result) {
                    reject(error);
                }
                else {
                    resolve(result.secure_url);
                }
            });
            stream.end(file === null || file === void 0 ? void 0 : file.buffer);
        });
        const courseDetails = {
            title,
            price: Number(price),
            description,
            thumbnail: imageUrl,
        };
        const updatedCourse = yield (0, course_service_1.updateCourse)(req.params.id, courseDetails);
        if (!course_service_1.updateCourse) {
            res.status(404).json({
                success: false, message: 'Course not found',
            });
        }
        ;
        res.status(200).json({ success: true, message: "Course updated successfully", data: updatedCourse });
    }
    catch (error) {
        console.error("Course creation failed:", error);
        res.status(400).json({ success: false, message: "Course creation failed", error });
    }
});
exports.updateCourseHandler = updateCourseHandler;
const deleteCourseHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield (0, course_service_1.deleteCourse)(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
            data: course
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Course delete failed',
            error
        });
    }
});
exports.deleteCourseHandler = deleteCourseHandler;
