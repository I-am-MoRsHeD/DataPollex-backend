import { model, Schema } from "mongoose";
import { IModule } from "../interfaces/module.interface";
import { z } from "zod";
import Lecture from "./lecture.model";


const moduleSchema = new Schema<IModule>({
    courseId: {
        type: Schema.Types.ObjectId,
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

export const moduleZodSchema = z.object({
    courseId: z.string(),
    title: z.string().min(5)
}).strict();

moduleSchema.post('findOneAndDelete', async function (doc) {
    if (!doc) return;
    const moduleId = doc._id;
    await Lecture.deleteMany({ moduleId });
    console.log(`Deleted module ${moduleId}, related lectures also deleted.`);
});


const Module = model<IModule>('Module', moduleSchema);
export default Module;