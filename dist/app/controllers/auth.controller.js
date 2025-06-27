"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = exports.createUserHandler = void 0;
const auth_services_1 = require("../services/auth.services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_services_1.createUser)(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "User creation failed",
            error
        });
    }
});
exports.createUserHandler = createUserHandler;
const getUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_services_1.getUser)(req.body);
        if (!user || !(yield user.comparePassword(req.body.password))) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: { user, token }
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User fetch failed',
            error
        });
    }
});
exports.getUserHandler = getUserHandler;
