import { ICourse } from "../interfaces/course.interface";
import Course, { CourseZodSchema } from "../models/course.model";


export const createCourse = (data: ICourse) => {
    const body = CourseZodSchema.parse(data);
    return Course.create(body);
};

export const getCourses = async () => {
    await Course.find({});
}