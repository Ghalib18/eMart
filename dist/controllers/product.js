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
exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const __1 = require("..");
const user_not_found_1 = require("../exceptions/user_not_found");
const root_1 = require("../exceptions/root");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield __1.prismaClient.product.create({
        data: Object.assign(Object.assign({}, req.body), { tags: req.body.tags.join(',') })
    });
    res.json(product);
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(',');
        }
        const updateProduct = yield __1.prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        });
        res.json(updateProduct);
    }
    catch (error) {
        throw new user_not_found_1.UserNotFound('Product not found', root_1.errorcode.USER_NOT_FOUND);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteproduct = yield __1.prismaClient.product.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json(deleteproduct);
    }
    catch (error) {
        throw new user_not_found_1.UserNotFound('Product not found', root_1.errorcode.USER_NOT_FOUND);
    }
});
exports.deleteProduct = deleteProduct;
