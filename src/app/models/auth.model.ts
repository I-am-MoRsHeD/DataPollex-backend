import { model, Schema } from "mongoose";
import { AuthDocument, IAuth } from "../interfaces/auth.interface";
import { z } from 'zod';
import bcrypt from 'bcryptjs';


const authSchema = new Schema<AuthDocument>({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },
    role: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const authZodSchema = z.object(
    {
        email: z.string().email().toLowerCase().trim(),
        password: z.string().min(8).trim(),
        role: z.string().trim().toUpperCase()
    }
);

authSchema.pre('save', async function () {
    if (this, this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};


const Auth = model<AuthDocument>('Auth', authSchema);
export default Auth;