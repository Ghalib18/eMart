"use strict";
//  we have to create the error class for the error that is going to happens in our project , here we will extends the error  class give by the javascript and  we will custmized it for our use...
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorcode = exports.HttpException = void 0;
// message , status code , error codes
class HttpException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super();
        this.message = message,
            this.errorCode = errorCode,
            this.statusCode = statusCode,
            this.errors = error;
    }
}
exports.HttpException = HttpException;
var errorcode;
(function (errorcode) {
    errorcode[errorcode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    errorcode[errorcode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    errorcode[errorcode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    errorcode[errorcode["MISSING_FIELDS"] = 1004] = "MISSING_FIELDS";
})(errorcode || (exports.errorcode = errorcode = {}));
