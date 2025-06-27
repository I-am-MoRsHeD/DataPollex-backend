import { Request, Response } from "express";
import { createLecture, deleteLecture, getAllLectures, updateLecture } from "../services/lecture.service";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createLectureHandler = async (req: Request, res: Response) => {
    try {
        const { title, videoUrl, moduleId } = req.body;
        const file = req.file;

        if (!file) {
            res.status(400).json({ message: "Pdf is required" });
        }

        const pdfUrl = await new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "lectures",
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

        const lectureDetails = {
            title,
            videoUrl,
            moduleId,
            pdfNotes: pdfUrl,
        };

        const newLecture = await createLecture(lectureDetails);

        res.status(201).json({ success: true, message: "Lecture created successfully", data: newLecture });
    } catch (error) {
        console.error("Lecture creation failed:", error);
        res.status(400).json({ success: false, message: "Lecture creation failed", error });
    }
};
// export const createLectureHandler = async (req: Request, res: Response) => {
//     try {
//         const body = await createLecture(req.body);
//         res.status(201).json({
//             success: true,
//             message: "Lecture created successfully",
//             data: body
//         })
//     } catch (error: unknown) {
//         res.status(400).json({
//             success: false,
//             message: "Lecture creation failed",
//             error
//         })
//     }
// };

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
        const { title, videoUrl, moduleId } = req.body;
        const file = req.file;

        const pdfUrl = await new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "lectures",
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

        const lectureDetails = {
            title,
            videoUrl,
            moduleId,
            pdfNotes: pdfUrl,
        };

        const updatedLecture = await updateLecture(req.params.id, lectureDetails);

        if (!updatedLecture) {
            res.status(404).json({ success: false, message: "Lecture not found" });
        }

        res.status(200).json({ success: true, message: "Lecture updated successfully", data: updatedLecture });
    } catch (error) {
        console.error("Lecture creation failed:", error);
        res.status(400).json({ success: false, message: "Lecture creation failed", error });
    };
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