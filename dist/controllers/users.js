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
exports.listAll = exports.deleteAddress = exports.addAddress = void 0;
const __1 = require("..");
const root_1 = require("../exceptions/root");
const user_not_found_1 = require("../exceptions/user_not_found");
const users_1 = require("../models/users");
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    users_1.AddressSchema.parse(req.body);
    const address = yield __1.prismaClient.address.create({
        data: Object.assign(Object.assign({}, req.body), { userId: req.user.id })
    });
    res.json(address);
});
exports.addAddress = addAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield __1.prismaClient.address.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json({
            success: true
        });
    }
    catch (error) {
        throw (new user_not_found_1.NotFoundException('Address not found', root_1.errorcode.ADDRESS_NOT_FOUND));
    }
});
exports.deleteAddress = deleteAddress;
const listAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addresses = yield __1.prismaClient.address.findMany({
        where: {
            userId: +req.user.id
        }
    });
    res.json(addresses);
});
exports.listAll = listAll;
