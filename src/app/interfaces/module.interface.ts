import { Types } from "mongoose";

export interface IModule {
    courseId: Types.ObjectId,
    title : string,
    moduleNumber : number;
}