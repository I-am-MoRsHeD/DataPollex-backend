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
exports.deleteLectureHandler = exports.updateLectureHandler = exports.getAllLecturesHandler = exports.createLectureHandler = void 0;
const lecture_service_1 = require("../services/lecture.service");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const createLectureHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, videoUrl, moduleId } = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: "Pdf is required" });
        }
        const pdfUrl = yield new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: "image",
                folder: "lectures",
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
        const lectureDetails = {
            title,
            videoUrl,
            moduleId,
            pdfNotes: pdfUrl,
        };
        const newLecture = yield (0, lecture_service_1.createLecture)(lectureDetails);
        res.status(201).json({ success: true, message: "Lecture created successfully", data: newLecture });
    }
    catch (error) {
        console.error("Lecture creation failed:", error);
        res.status(400).json({ success: false, message: "Lecture creation failed", error });
    }
});
exports.createLectureHandler = createLectureHandler;
// export const createLectureHandler = async (req: Request, res: Response) => {
//     try {
//         const body = await createLecture(req.body);
//         res.status(201).json({
//             success: true,
//             message: "Lecture created successfully",
//             data: body
//         })
//     } catch (error: unknown) {
//         res.status(400).json({
//             success: false,
//             message: "Lecture creation failed",
//             error
//         })
//     }
// };
const getAllLecturesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, lecture_service_1.getAllLectures)();
        res.status(200).json({
            success: true,
            message: "Lectures fetched successfully",
            data: body
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Lectures fetch failed",
            error
        });
    }
});
exports.getAllLecturesHandler = getAllLecturesHandler;
const updateLectureHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, videoUrl, moduleId } = req.body;
        const file = req.file;
        const pdfUrl = yield new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: "image",
                folder: "lectures",
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
        const lectureDetails = {
            title,
            videoUrl,
            moduleId,
            pdfNotes: pdfUrl,
        };
        const updatedLecture = yield (0, lecture_service_1.updateLecture)(req.params.id, lectureDetails);
        if (!updatedLecture) {
            res.status(404).json({ success: false, message: "Lecture not found" });
        }
        res.status(200).json({ success: true, message: "Lecture updated successfully", data: updatedLecture });
    }
    catch (error) {
        console.error("Lecture creation failed:", error);
        res.status(400).json({ success: false, message: "Lecture creation failed", error });
    }
    ;
});
exports.updateLectureHandler = updateLectureHandler;
const deleteLectureHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lecture = yield (0, lecture_service_1.deleteLecture)(req.params.id);
        if (!lecture) {
            res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }
        ;
        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
            data: lecture
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Lecture delete failed",
            error
        });
    }
});
exports.deleteLectureHandler = deleteLectureHandler;
