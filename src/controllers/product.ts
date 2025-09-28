import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { UserNotFound } from "../exceptions/user_not_found";
import { errorcode } from "../exceptions/root";

export const createProduct= async (req:Request,res:Response,next:NextFunction)=>{

    const product =await prismaClient.product.create({
        data:{
            ...req.body,
            tags:req.body.tags.join(',')
        }
    })
   res.json(product)
}

export const updateProduct =async (req:Request , res:Response )=>{
 
    try {
         const product=req.body
         if(product.tags) {
            product.tags =product.tags.join(',')
         }
         const updateProduct=await prismaClient.product.update({
             where :{
                id:+req.params.id
             },
             data:product
         })
          res.json(updateProduct)
    } catch (error) {
        throw new UserNotFound('Product not found',errorcode.USER_NOT_FOUND)
    }
}

export const  deleteProduct =async (req:Request,res:Response) => {
     try {
        const deleteproduct =await prismaClient.product.delete({
            where :{
                id:+req.params.id
            }
        })
        res.json(deleteproduct)
     } catch (error) {
        throw new UserNotFound('Product not found',errorcode.USER_NOT_FOUND)
     }
}