import { IAuth } from "../interfaces/auth.interface";
import Auth, { authZodSchema } from "../models/auth.model";


export const createUser = async (data: IAuth) => {
    const body = await authZodSchema.parseAsync(data);
    return await Auth.create(body);
};

export const getUser = async (data: IAuth) => {
    const user = await Auth.findOne({ email: data?.email });
    return user;
};