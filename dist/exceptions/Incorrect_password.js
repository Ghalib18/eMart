"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectPassword = void 0;
const root_1 = require("./root");
class IncorrectPassword extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 401, null);
    }
}
exports.IncorrectPassword = IncorrectPassword;
