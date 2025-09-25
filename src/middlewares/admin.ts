import { NextFunction,Request,Response } from "express";
import { Unauthorized } from "../exceptions/Unauthorized";
import { errorcode } from "../exceptions/root";


export const adminMiddleware=async (req:Request ,res:Response,next:NextFunction)=>{
    const user= req.user
    if(user.role=='ADMIN'){
        next()
    }
    else{
        next (new Unauthorized('Unauthorized',errorcode.UNAUTHORIZED_ACCESS))
    }
}