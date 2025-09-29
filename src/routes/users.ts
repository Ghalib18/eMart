import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {addAddress, deleteAddress, listAll} from "../controllers/users";
import { errorHandler } from "../error_handler";

const addressRouter:Router=Router();

addressRouter.post('/add',[authMiddleware], errorHandler(addAddress));
addressRouter.delete('/delete/:id',[authMiddleware],errorHandler(deleteAddress));
addressRouter.get('/listadd',[authMiddleware],errorHandler(listAll))

export default addressRouter