import { model, Schema } from "mongoose";
import { ILecture } from "../interfaces/lecture.interface";
import { z } from "zod";


const lectureSchema = new Schema<ILecture>({
    moduleId: {
        type: Schema.Types.ObjectId,
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
        type: [String],
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const lectureZodSchema = z.object({
    moduleId: z.string(),
    title: z.string().min(5),
    videoUrl: z.string(),
    pdfNotes: z.array(z.string())
});


const Lecture = model<ILecture>('Lecture', lectureSchema);
export default Lecture;