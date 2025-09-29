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
exports.getProductById = exports.listProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const __1 = require("..");
const user_not_found_1 = require("../exceptions/user_not_found");
const root_1 = require("../exceptions/root");
//  Creating new product
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield __1.prismaClient.product.create({
        data: Object.assign(Object.assign({}, req.body), { tags: req.body.tags.join(',') })
    });
    res.json(product);
});
exports.createProduct = createProduct;
// updating the product
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
        throw new user_not_found_1.NotFoundException('Product not found', root_1.errorcode.USER_NOT_FOUND);
    }
});
exports.updateProduct = updateProduct;
// deleting the product
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
        throw new user_not_found_1.NotFoundException('Product not found', root_1.errorcode.USER_NOT_FOUND);
    }
});
exports.deleteProduct = deleteProduct;
// listing all the product
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   this should be the structure of the response that we are expecting
    // {
    //     count :100,
    //     data:[]
    // }
    const count = yield __1.prismaClient.product.count();
    const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0;
    const products = yield __1.prismaClient.product.findMany({
        skip,
        take: 5
    });
    res.json({
        cnt: count,
        data: products
    });
});
exports.listProduct = listProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield __1.prismaClient.product.findFirst({
            where: {
                id: +req.params.id
            }
        });
        res.json(product);
    }
    catch (error) {
        throw new user_not_found_1.NotFoundException('Product not found', root_1.errorcode.USER_NOT_FOUND);
    }
});
exports.getProductById = getProductById;
