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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseZodSchema = exports.courseSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const module_model_1 = __importDefault(require("./module.model"));
const lecture_model_1 = __importDefault(require("./lecture.model"));
exports.courseSchema = new mongoose_1.Schema({
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 20
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.CourseZodSchema = zod_1.z.object({
    thumbnail: zod_1.z.string().url(),
    title: zod_1.z.string().min(1).max(255),
    price: zod_1.z.number(),
    description: zod_1.z.string().min(20).trim()
}).strict();
exports.courseSchema.post('findOneAndDelete', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!doc)
            return;
        const courseId = doc._id;
        const modules = yield module_model_1.default.find({ courseId });
        const moduleIds = modules.map(m => m._id);
        yield module_model_1.default.deleteMany({ courseId });
        yield lecture_model_1.default.deleteMany({ moduleId: { $in: moduleIds } });
        console.log(`Deleted course ${courseId}, related modules & lectures`);
    });
});
const Course = (0, mongoose_1.model)('Course', exports.courseSchema);
exports.default = Course;
