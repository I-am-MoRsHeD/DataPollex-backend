import Module, { moduleZodSchema } from "../models/module.model";


const createModule = async (data: any) => {
    const body = moduleZodSchema.parseAsync(data);
    return Module.create(body);
};

const getModules = async () => {
    return Module.find({}).populate('courseId');
};

const updateModule = async (id: string, data: any) => {
    return Module.findByIdAndUpdate(id, data, { new: true });
};

const deleteModule = async (id: string) => {
    return Module.findByIdAndDelete(id);
};

export { createModule, getModules, updateModule, deleteModule };