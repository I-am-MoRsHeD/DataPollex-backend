import { Request, Response } from "express";
import { createCourse } from "../services/course.service";


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
}