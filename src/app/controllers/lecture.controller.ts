import { Request, Response } from "express";
import { createLecture, deleteLecture, getAllLectures, updateLecture } from "../services/lecture.service";


export const createLectureHandler = async (req: Request, res: Response) => {
    try {
        const body = await createLecture(req.body);
        res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            data: body
        })
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Lecture creation failed",
            error
        })
    }
};

export const getAllLecturesHandler = async (req: Request, res: Response) => {
    try {
        const body = await getAllLectures();
        res.status(200).json({
            success: true,
            message: "Lectures fetched successfully",
            data: body
        })
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Lectures fetch failed",
            error
        })
    }
};

export const updateLectureHandler = async (req: Request, res: Response) => {
    try {
        const lecture = await updateLecture(req.params.id, req.body);
        if (!lecture) {
            res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            data: lecture
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Lecture update failed",
            error
        })
    }
};

export const deleteLectureHandler = async (req: Request, res: Response) => {
    try {
        const lecture = await deleteLecture(req.params.id);
        if (!lecture) {
            res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        };
        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
            data: lecture
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Lecture delete failed",
            error
        })
    }
}