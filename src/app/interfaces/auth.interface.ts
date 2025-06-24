import { Model } from "mongoose";

export interface IAuth {
    email : string;
    password : string;
    role : string;
};

export interface AuthDocument extends IAuth, Document {
    comparePassword(password: string): Promise<boolean>;
};
