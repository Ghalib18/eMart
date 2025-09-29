import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/user_not_found";
import { errorcode } from "../exceptions/root";
import { json } from "zod";

//  Creating new product

export const createProduct= async (req:Request,res:Response,next:NextFunction)=>{

    const product =await prismaClient.product.create({
        data:{
            ...req.body,
            tags:req.body.tags.join(',')
        }
    })
   res.json(product)
}

// updating the product

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
        throw new NotFoundException('Product not found',errorcode.USER_NOT_FOUND)
    }
}
 
// deleting the product

export const  deleteProduct =async (req:Request,res:Response) => {
     try {
        const deleteproduct =await prismaClient.product.delete({
            where :{
                id:+req.params.id
            }
        })
        res.json(deleteproduct)
     } catch (error) {
        throw new NotFoundException('Product not found',errorcode.USER_NOT_FOUND)
     }
}

// listing all the product

export const listProduct =async (req:Request ,res:Response)=>{
    //   this should be the structure of the response that we are expecting
    // {
    //     count :100,
    //     data:[]
    // }

    const count =await prismaClient.product.count();
     
     const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : 0;

    const products= await prismaClient.product.findMany({
        skip,
        take:5
    })
    res.json({

        cnt:count,
        data:products
    })


}

export const getProductById=async (req:Request,res:Response)=>{
    try {
         const product= await prismaClient.product.findFirst({
           where :{
                id:+req.params.id
            }
         })
       res.json(product)

    } catch (error) {
        throw new NotFoundException('Product not found',errorcode.USER_NOT_FOUND)
    
    }
}