import { courseSchema } from "../models/course.model";
import Module from "../models/module.model";

export const courseDeletedMiddleware = courseSchema.post('deleteOne', async (doc) => {
    console.log(doc);
    // if(doc){
    //     const modules = await Module.findByIdAndDelete(doc._id);
    // }
})