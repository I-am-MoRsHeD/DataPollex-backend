import { Request, Response } from "express";
import { createModule, deleteModule, getLectureByModuleId, getModules, updateModule } from "../services/module.service";


export const createModuleHandler = async (req: Request, res: Response) => {
    try {
        const body = await createModule(req.body);
        res.status(201).json({
            success: true,
            message: "Module created successfully",
            data: body
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Module creation failed",
            error
        })
    }
};

export const getAllModules = async (req: Request, res: Response) => {
    try {
        const modules = await getModules();
        res.status(200).json({
            success: true,
            message: 'Modules fetched successfully',
            data: modules
        })
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: 'Modules fetch failed',
            error
        })
    }
};

export const getLectureByModuleIdHandler = async (req: Request, res: Response) => {
    try {
        const lectures = await getLectureByModuleId(req.params.id);

        res.status(200).json({
            success: true,
            message: "Lectures fetched successfully",
            data: lectures
        })
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Lectures fetch failed",
            error
        })
    }
}

export const updateModuleHandler = async (req: Request, res: Response) => {
    try {
        const module = await updateModule(req.params.id, req.body);
        if(!module){
            res.status(404).json({
                success: false,
                message: "Module not found"
            });
        };
        res.status(200).json({
            success: true,
            message: "Module updated successfully",
            data: module
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Module update failed",
            error
        })
    }
};

export const deleteModuleHandler = async (req: Request, res: Response) => {
    try {
        const body = await deleteModule(req.params.id);
        res.status(200).json({
            success: true,
            message: "Module deleted successfully",
            data: body
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Module delete failed",
            error
        })
    }
};
