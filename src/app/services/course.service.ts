import { ICourse } from "../interfaces/course.interface";
import Course, { CourseZodSchema } from "../models/course.model";


const createCourse = (data: ICourse) => {
    const body = CourseZodSchema.parseAsync(data);
    return Course.create(body);
};

const getCourses = async () => {
    return await Course.find({});
};

const getSingleCourse = async(id : string) => {
    return await Course.findById(id);
};

const updateCourse = async (id: string, data: ICourse) => {
    return await Course.findByIdAndUpdate(id, data, { new: true });
};

const deleteCourse = async (id: string) => {
    return await Course.findByIdAndDelete(id);
};

export { createCourse, getCourses, getSingleCourse, updateCourse, deleteCourse };