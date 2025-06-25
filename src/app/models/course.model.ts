import { model, Schema } from "mongoose";
import { z } from "zod";
import { ICourse } from "../interfaces/course.interface";


export const courseSchema = new Schema<ICourse>({
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
    versionKey : false,
    timestamps: true
});

export const CourseZodSchema = z.object({
    thumbnail: z.string().min(1).max(255),
    title: z.string().min(1).max(255),
    price: z.number(),
    description: z.string().min(20).trim()
}).strict();

const Course = model('Course', courseSchema);
export default Course;