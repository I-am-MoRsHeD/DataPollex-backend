import { Request, Response } from "express";
import { createModule, deleteModule, getModules, updateModule } from "../services/module.service";


const createModuleHandler = async (req: Request, res: Response) => {
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

const getAllModules = async (req: Request, res: Response) => {
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

const updateModuleHandler = async (req: Request, res: Response) => {
    try {
        const body = await updateModule(req.params.id, req.body);
        res.status(201).json({
            success: true,
            message: "Module updated successfully",
            data: body
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "Module update failed",
            error
        })
    }
};

const deleteModuleHandler = async (req: Request, res: Response) => {
    try {
        const body = await deleteModule(req.params.id);
        res.status(201).json({
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

export { createModuleHandler, getAllModules, updateModuleHandler, deleteModuleHandler };