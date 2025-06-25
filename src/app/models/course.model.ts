import { model, Schema } from "mongoose";
import { z } from "zod";
import { ICourse } from "../interfaces/course.interface";
import { courseDeletedMiddleware } from "../middlewares/utilMiddlewares";
import Module from "./module.model";
import Lecture from "./lecture.model";


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
    versionKey: false,
    timestamps: true
});

export const CourseZodSchema = z.object({
    thumbnail: z.string().min(1).max(255),
    title: z.string().min(1).max(255),
    price: z.number(),
    description: z.string().min(20).trim()
}).strict();

courseSchema.post('findOneAndDelete', async function (doc) {
  if (!doc) return;

  const courseId = doc._id;

  const modules = await Module.find({ courseId });
  const moduleIds = modules.map(m => m._id);

  await Module.deleteMany({ courseId });
  await Lecture.deleteMany({ moduleId: { $in: moduleIds } });

  console.log(`Deleted course ${courseId}, related modules & lectures`);
});


const Course = model<ICourse>('Course', courseSchema);
export default Course;