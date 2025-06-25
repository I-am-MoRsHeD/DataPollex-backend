import { Types } from "mongoose";

export interface ILecture {
    moduleId: Types.ObjectId;
    title: string;
    videoUrl: string;
    pdfNotes: [string];
}