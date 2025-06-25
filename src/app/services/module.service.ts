import { IModule } from "../interfaces/module.interface";
import Lecture from "../models/lecture.model";
import Module, { moduleZodSchema } from "../models/module.model";


const createModule = async (data: IModule) => {
    const body = await moduleZodSchema.parseAsync(data);

    const count = await Module.countDocuments({ courseId: body.courseId });
    const moduleNumber = count + 1;
    const moduleData = { ...body, moduleNumber };

    return await Module.create(moduleData);
};

const getModules = async () => {
    return Module.find({}).populate('courseId');
};

const getLectureByModuleId = async (id: string) => {
    return await Lecture.find({ moduleId: id });
};

const getSingleModule = async (id: string) => {
    return await Module.findById(id);
};

const updateModule = async (id: string, data: IModule) => {
    return Module.findByIdAndUpdate(id, data, { new: true });
};

const deleteModule = async (id: string) => {
    return Module.findByIdAndDelete(id);
};

export { createModule, getModules, getLectureByModuleId ,getSingleModule ,updateModule, deleteModule };