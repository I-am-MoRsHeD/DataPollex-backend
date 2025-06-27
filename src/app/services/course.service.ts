import { ICourse } from "../interfaces/course.interface";
import Course, { CourseZodSchema } from "../models/course.model";
import Module from "../models/module.model";

const createCourse = async (data: ICourse) => {
    const body = await CourseZodSchema.parseAsync(data);
    return await Course.create(body);
};

const getCourses = async () => {
    return await Course.find({});
};

const getCourseWithModules = async () => {
    const courseWithModules = await Course.aggregate([
        {
            $lookup: {
                from: 'modules',
                localField: '_id',
                foreignField: 'courseId',
                as: 'modules'
            }
        }
    ]);
    return courseWithModules;
};

const getModulesbyCourseId = async (id: string) => {
    return await Module.find({ courseId: id });
};

const getSingleCourse = async (id: string) => {
    return await Course.findById(id);
};

const updateCourse = async (id: string, data: ICourse) => {
    return await Course.findByIdAndUpdate(id, data, { new: true });
};

const deleteCourse = async (id: string) => {
    return await Course.findByIdAndDelete(id);
};

export { createCourse, getCourses, getCourseWithModules, getModulesbyCourseId, getSingleCourse, updateCourse, deleteCourse };