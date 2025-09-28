import { Router } from "express";
import { createProduct, deleteProduct, getProductById, listProduct, updateProduct } from "../controllers/product";
import { errorHandler } from "../error_handler";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

 
 const productRouter:Router=Router();

 productRouter.post('/create',[authMiddleware,adminMiddleware],errorHandler(createProduct))
 productRouter.put('/update/:id',[authMiddleware,adminMiddleware],errorHandler(updateProduct))
 productRouter.delete('/delete/:id',[authMiddleware,adminMiddleware], errorHandler(deleteProduct))
 productRouter.get('/listproduct',[authMiddleware,adminMiddleware],errorHandler(listProduct))
 productRouter.get('/getbyid/:id',[authMiddleware,adminMiddleware],errorHandler(getProductById))

 export default productRouter