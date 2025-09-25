"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.login = exports.signup = void 0;
const __1 = require("..");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const user_not_found_1 = require("../exceptions/user_not_found");
const Incorrect_password_1 = require("../exceptions/Incorrect_password");
const users_1 = require("../models/users");
// for signup-part....
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    users_1.SignUpSchema.parse(req.body);
    const { name, email, password } = req.body;
    let user = yield __1.prismaClient.user.findFirst({ where: { email } });
    if (user) {
        next(new bad_request_1.BadRequestException('User already exists', root_1.errorcode.USER_ALREADY_EXISTS));
    }
    user = yield __1.prismaClient.user.create({
        data: {
            name,
            email,
            password: (0, bcrypt_1.hashSync)(password, 10)
        }
    });
    res.json(user);
});
exports.signup = signup;
// for login part....
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new bad_request_1.BadRequestException('All the fields are necessary', root_1.errorcode.MISSING_FIELDS));
    }
    const user = yield __1.prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        next(new user_not_found_1.UserNotFound('User not found', root_1.errorcode.USER_NOT_FOUND));
        return;
    }
    if (!(0, bcrypt_1.compareSync)(password, user.password)) {
        next(new Incorrect_password_1.IncorrectPassword('Password is incorrect', root_1.errorcode.INCORRECT_PASSWORD));
        return;
    }
    const token = jwt.sign({
        userId: user.id
    }, __1.JWT_SECRET);
    res.json({ user, token });
});
exports.login = login;
