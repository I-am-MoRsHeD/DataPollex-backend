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
exports.authZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authSchema = new mongoose_1.Schema({
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
exports.authZodSchema = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase().trim(),
    password: zod_1.z.string().min(8).trim(),
    role: zod_1.z.string().trim().toUpperCase()
});
authSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this, this.isModified('password')) {
            this.password = yield bcryptjs_1.default.hash(this.password, 10);
        }
    });
});
authSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
const Auth = (0, mongoose_1.model)('Auth', authSchema);
exports.default = Auth;
