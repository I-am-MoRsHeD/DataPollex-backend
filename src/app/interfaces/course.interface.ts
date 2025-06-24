import { Types } from "mongoose";

export interface ICourse {
    thumbnail : string,
    title : string,
    price : number,
    description : string,
    modules? : Types.ObjectId
}