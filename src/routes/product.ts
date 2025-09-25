import { Router } from "express";
import { createProduct } from "../controllers/product";
import { errorHandler } from "../error_handler";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

 
 const productRouter:Router=Router();

 productRouter.post('/create',[authMiddleware,adminMiddleware],errorHandler(createProduct))

 export default productRouter