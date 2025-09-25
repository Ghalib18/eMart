"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = exports.JWT_SECRET = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
// import { PrismaClient } from '@prisma/client';
const prisma_1 = require("../src/generated/prisma");
const error_1 = require("./middlewares/error");
dotenv_1.default.config({ path: ".env" });
const PORT = process.env.PORT;
exports.JWT_SECRET = process.env.JWT_SECRET;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routes_1.default);
exports.prismaClient = new prisma_1.PrismaClient({
    log: ['query']
});
app.use(error_1.errorMiddleware);
app.listen(3000, () => {
    console.log("Everything is running perfectly fine");
});
