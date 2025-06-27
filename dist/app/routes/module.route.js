"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRouter = void 0;
const express_1 = __importDefault(require("express"));
const module_controller_1 = require("../controllers/module.controller");
exports.moduleRouter = express_1.default.Router();
exports.moduleRouter.post('/', module_controller_1.createModuleHandler);
exports.moduleRouter.get('/', module_controller_1.getAllModules);
exports.moduleRouter.get('/:id/lectures', module_controller_1.getLectureByModuleIdHandler);
exports.moduleRouter.get('/:id', module_controller_1.getSingleModuleHandler);
exports.moduleRouter.patch('/:id', module_controller_1.updateModuleHandler);
exports.moduleRouter.delete('/:id', module_controller_1.deleteModuleHandler);
