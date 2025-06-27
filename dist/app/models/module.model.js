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
exports.moduleZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const lecture_model_1 = __importDefault(require("./lecture.model"));
const moduleSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Module title must be at least 5 characters long']
    },
    moduleNumber: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.moduleZodSchema = zod_1.z.object({
    courseId: zod_1.z.string(),
    title: zod_1.z.string().min(5)
}).strict();
moduleSchema.post('findOneAndDelete', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!doc)
            return;
        const moduleId = doc._id;
        yield lecture_model_1.default.deleteMany({ moduleId });
        console.log(`Deleted module ${moduleId}, related lectures also deleted.`);
    });
});
const Module = (0, mongoose_1.model)('Module', moduleSchema);
exports.default = Module;
