import { ILecture } from "../interfaces/lecture.interface";
import Lecture, { lectureZodSchema } from "../models/lecture.model";

const createLecture = async (data: ILecture) => {
    const lecture = await lectureZodSchema.parseAsync(data);
    return Lecture.create(lecture);
};

const getAllLectures = async () => {
    const lectures = await Lecture.find();
    return lectures;
};

const getSingleLecture = async (id: string) => {
    const lecture = await Lecture.findById(id);
    return lecture;
};

const updateLecture = async (id: string, data: ILecture) => {
    const lecture = await Lecture.findByIdAndUpdate(id, data, { new: true });
    return lecture;
};

const deleteLecture = async (id: string) => {
    const lecture = await Lecture.findByIdAndDelete(id);
    return lecture;
};

export { createLecture, getAllLectures, getSingleLecture, updateLecture, deleteLecture };