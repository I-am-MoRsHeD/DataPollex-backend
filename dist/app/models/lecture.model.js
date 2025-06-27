"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const lectureSchema = new mongoose_1.Schema({
    moduleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Module'
    },
    title: {
        type: String,
        required: true,
        minlength: [5, 'Lecture title must be at least 5 characters long']
    },
    videoUrl: {
        type: String,
        required: true
    },
    pdfNotes: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.lectureZodSchema = zod_1.z.object({
    moduleId: zod_1.z.string(),
    title: zod_1.z.string().min(5),
    videoUrl: zod_1.z.string(),
    pdfNotes: zod_1.z.string().url()
});
const Lecture = (0, mongoose_1.model)('Lecture', lectureSchema);
exports.default = Lecture;
