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
exports.UpdatingUser = exports.listAll = exports.deleteAddress = exports.addAddress = void 0;
const __1 = require("..");
const root_1 = require("../exceptions/root");
const user_not_found_1 = require("../exceptions/user_not_found");
const users_1 = require("../models/users");
const bad_request_1 = require("../exceptions/bad-request");
//  adding the address for users
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    users_1.AddressSchema.parse(req.body);
    const address = yield __1.prismaClient.address.create({
        data: Object.assign(Object.assign({}, req.body), { userId: req.user.id })
    });
    res.json(address);
});
exports.addAddress = addAddress;
// deleting the addresses from users list
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
// list all the address that are present in given users list...
const listAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addresses = yield __1.prismaClient.address.findMany({
        where: {
            userId: +req.user.id
        }
    });
    res.json(addresses);
});
exports.listAll = listAll;
const UpdatingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ValidateData = users_1.UpdateUserSchema.parse(req.body);
    let shippingAddress;
    let billingAddress;
    if (ValidateData.defaultShipingAddressId) {
        try {
            shippingAddress = yield __1.prismaClient.address.findFirstOrThrow({
                where: {
                    id: ValidateData.defaultShipingAddressId
                }
            });
        }
        catch (error) {
            throw (new user_not_found_1.NotFoundException('Address not found', root_1.errorcode.ADDRESS_NOT_FOUND));
        }
        if (shippingAddress.userId != req.user.id) {
            throw new bad_request_1.BadRequestException("Address does not belong to the user", root_1.errorcode.ADDRESS_NOT_BELONG_TO_USER);
        }
    }
    if (ValidateData.defaultBillingAddressId) {
        try {
            billingAddress = yield __1.prismaClient.address.findFirstOrThrow({
                where: {
                    id: ValidateData.defaultBillingAddressId
                }
            });
        }
        catch (error) {
            throw (new user_not_found_1.NotFoundException('Address not found', root_1.errorcode.ADDRESS_NOT_FOUND));
        }
        if (billingAddress.userId != req.user.id) {
            throw new bad_request_1.BadRequestException("Address does not belong to the user", root_1.errorcode.ADDRESS_NOT_BELONG_TO_USER);
        }
    }
    const updatedUser = yield __1.prismaClient.user.update({
        where: {
            id: req.user.id
        },
        data: ValidateData
    });
    res.json(ValidateData);
});
exports.UpdatingUser = UpdatingUser;
