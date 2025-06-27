import 'dotenv/config';
import { Request, Response } from "express";
import { createCourse, deleteCourse, getCourses, getCourseWithModules, getModulesbyCourseId, getSingleCourse, updateCourse } from "../services/course.service";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createCourseHandler = async (req: Request, res: Response) => {
    try {
        const { title, price, description } = req.body;
        const file = req.file;

        if (!file) {
            res.status(400).json({ message: "Image is required" });
        }

        const imageUrl = await new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "courses",
                },
                (error, result) => {
                    if (error || !result) {
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                }
            );
            stream.end(file?.buffer);
        });

        const courseDetails = {
            title,
            price: Number(price),
            description,
            thumbnail: imageUrl,
        };

        // const validated = await CourseZodSchema.parseAsync(courseDetails);
        const newCourse = await createCourse(courseDetails);

        res.status(201).json({ success: true, message: "Course created successfully", data: newCourse });
    } catch (error) {
        console.error("Course creation failed:", error);
        res.status(400).json({ success: false, message: "Course creation failed", error });
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

export const getCourseWithModulesHandler = async (req: Request, res: Response) => {
    try {
        const courseWithModules = await getCourseWithModules();
        res.status(200).json({
            success: true,
            message: 'Course with modules fetched successfully',
            data: courseWithModules
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Modules fetch failed",
            error
        })
    }
};

export const getModulesbyCourseIdHandler = async (req: Request, res: Response) => {
    try {
        const data = await getModulesbyCourseId(req.params.id);
        res.status(200).json({
            success: true,
            message: "Modules fetched successfully",
            data
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Modules fetch failed",
            error
        })
    }
}

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
        const { title, price, description } = req.body;
        const file = req.file;

        const imageUrl = await new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "courses",
                },
                (error, result) => {
                    if (error || !result) {
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                }
            );
            stream.end(file?.buffer);
        });

        const courseDetails = {
            title,
            price: Number(price),
            description,
            thumbnail: imageUrl,
        };
        const updatedCourse = await updateCourse(req.params.id, courseDetails);
        if (!updateCourse) {
            res.status(404).json({
                success: false, message: 'Course not found',
            })
        };

        res.status(200).json({ success: true, message: "Course updated successfully", data: updatedCourse });
    } catch (error) {
        console.error("Course creation failed:", error);
        res.status(400).json({ success: false, message: "Course creation failed", error });
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