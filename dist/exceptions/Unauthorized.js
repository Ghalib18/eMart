"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
const root_1 = require("./root");
class Unauthorized extends root_1.HttpException {
    constructor(message, errorCode, error) {
        super(message, errorCode, 401, error);
    }
}
exports.Unauthorized = Unauthorized;
