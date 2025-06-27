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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModuleHandler = exports.updateModuleHandler = exports.getSingleModuleHandler = exports.getLectureByModuleIdHandler = exports.getAllModules = exports.createModuleHandler = void 0;
const module_service_1 = require("../services/module.service");
const createModuleHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, module_service_1.createModule)(req.body);
        res.status(201).json({
            success: true,
            message: "Module created successfully",
            data: body
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Module creation failed",
            error
        });
    }
});
exports.createModuleHandler = createModuleHandler;
const getAllModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modules = yield (0, module_service_1.getModules)();
        res.status(200).json({
            success: true,
            message: 'Modules fetched successfully',
            data: modules
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Modules fetch failed',
            error
        });
    }
});
exports.getAllModules = getAllModules;
const getLectureByModuleIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lectures = yield (0, module_service_1.getLectureByModuleId)(req.params.id);
        res.status(200).json({
            success: true,
            message: "Lectures fetched successfully",
            data: lectures
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Lectures fetch failed",
            error
        });
    }
});
exports.getLectureByModuleIdHandler = getLectureByModuleIdHandler;
const getSingleModuleHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const module = yield (0, module_service_1.getSingleModule)(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Module fetched successfully',
            data: module
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Module fetch failed',
            error
        });
    }
});
exports.getSingleModuleHandler = getSingleModuleHandler;
const updateModuleHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const module = yield (0, module_service_1.updateModule)(req.params.id, req.body);
        if (!module) {
            res.status(404).json({
                success: false,
                message: "Module not found"
            });
        }
        ;
        res.status(200).json({
            success: true,
            message: "Module updated successfully",
            data: module
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Module update failed",
            error
        });
    }
});
exports.updateModuleHandler = updateModuleHandler;
const deleteModuleHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, module_service_1.deleteModule)(req.params.id);
        res.status(200).json({
            success: true,
            message: "Module deleted successfully",
            data: body
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Module delete failed",
            error
        });
    }
});
exports.deleteModuleHandler = deleteModuleHandler;
