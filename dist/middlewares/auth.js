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
exports.authMiddleware = void 0;
const Unauthorized_1 = require("../exceptions/Unauthorized");
const root_1 = require("../exceptions/root");
const jwt = __importStar(require("jsonwebtoken"));
const __1 = require("..");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract the token from the header
    const token = req.headers.authorization;
    // 2. if token is not present , throw an error of unauthorized
    if (!token) {
        next(new Unauthorized_1.Unauthorized('Unauthorized', root_1.errorcode.UNAUTHORIZED_ACCESS));
        return;
    }
    // 3.if token is present please verify the token and extract the playload
    try {
        const payload = jwt.verify(token, __1.JWT_SECRET);
        // 4. to get the user from the playload
        const user = yield __1.prismaClient.user.findFirst({ where: { id: payload.userId } });
        if (!user) {
            next(new Unauthorized_1.Unauthorized('unauthorized-Acess', root_1.errorcode.UNAUTHORIZED_ACCESS));
            return;
        }
        // 5. to attach the user to the current request object
        req.user = user;
        next();
    }
    catch (error) {
        next(new Unauthorized_1.Unauthorized('unathorized_Acess', root_1.errorcode.UNAUTHORIZED_ACCESS));
    }
});
exports.authMiddleware = authMiddleware;
