import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../exceptions/Unauthorized";
import { errorcode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET, prismaClient } from "..";
export const  authMiddleware= async (req:Request,res:Response,next :NextFunction)=>{

    // extract the token from the header
    const token =req.headers.authorization

    // 2. if token is not present , throw an error of unauthorized

    if(!token){
        next(new Unauthorized('Unauthorized',errorcode.UNAUTHORIZED_ACCESS))
        return
    }

    // 3.if token is present please verify the token and extract the playload
       
    try {
       
        const payload =jwt.verify(token,JWT_SECRET) as any

         // 4. to get the user from the playload

        const user= await prismaClient.user.findFirst({where :{id:payload.userId}})

        if(!user){
            next (new Unauthorized('unauthorized-Acess',errorcode.UNAUTHORIZED_ACCESS))
            return
        }

        // 5. to attach the user to the current request object
        req.user=user;
        next();
        
    } catch (error) {
        next (new Unauthorized('unathorized_Acess',errorcode.UNAUTHORIZED_ACCESS))
    }
   
}