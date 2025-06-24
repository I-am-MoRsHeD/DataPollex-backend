import { ICourse } from "../interfaces/course.interface";
import Course, { CourseZodSchema } from "../models/course.model";


export const createCourse = (data: ICourse) => {
    const body = CourseZodSchema.parse(data);
    return Course.create(body);
};

export const getCourses = async () => {
    return await Course.find({});
};

export const getSingleCourse = async(id : string) => {
    return await Course.findById(id);
};

export const updateCourse = async (id: string, data: ICourse) => {
    return await Course.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourse = async (id: string) => {
    return await Course.findByIdAndDelete(id);
}