import { NextFunction, Request, Response } from "express";
import { createUser, getUser } from "../services/auth.services";
import jwt from 'jsonwebtoken';


export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: "User creation failed",
            error
        })
    }
};

export const getUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req.body);
        if (!user || !(await user.comparePassword(req.body.password))) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        } else {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
                expiresIn: '1h'
            });
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: { user, token }
            });
        }
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: 'User fetch failed',
            error
        })
    }
}