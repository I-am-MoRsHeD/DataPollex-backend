import { Request, Response } from "express";
import { createCourse, deleteCourse, getCourses, getSingleCourse, updateCourse } from "../services/course.service";


export const createCourseHandler = async (req: Request, res: Response) => {

    try {
        const course = await createCourse(req.body);
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Course creation failed",
            error
        })
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await getCourses();
        res.status(200).json({
            success: true,
            message: 'Courses fetched successfully',
            data: courses
        })
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: 'Courses fetch failed',
            error
        })
    }
};

export const getSingleCourseHandler = async (req: Request, res: Response) => {
    try {
        const course = await getSingleCourse(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Course fetched successfully',
            data: course
        })
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: 'Course fetch failed',
            error
        })
    }
};

export const updateCourseHandler = async (req: Request, res: Response) => {
    try {
        const course = await updateCourse(req.params.id, req.body);
        if (!course) {
            res.status(400).json({
                success: false,
                message: 'Invalid course update data',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: course
        })
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: 'Course update failed',
            error
        })
    }
};

export const deleteCourseHandler = async (req: Request, res: Response) => {
    try {
        const course = await deleteCourse(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
            data: course
        })
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: 'Course delete failed',
            error
        })
    }
};