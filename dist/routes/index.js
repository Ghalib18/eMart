"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const product_1 = __importDefault(require("./product"));
const rootRouter = (0, express_1.Router)();
rootRouter.use('/auth', auth_1.default);
rootRouter.use('/product', product_1.default);
exports.default = rootRouter;
