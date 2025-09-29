import { success } from "zod"
import { prismaClient } from ".."
import { errorcode } from "../exceptions/root"
import { NotFoundException } from "../exceptions/user_not_found"
import { AddressSchema } from "../models/users"
import { Request,Response } from "express"

export const addAddress= async(req:Request,res:Response)=>{
    AddressSchema.parse(req.body)
    const address =await prismaClient.address.create({
        data:{
            ...req.body,
            userId :req.user.id
        }
    })
    res.json(address)
}

export const deleteAddress= async(req:Request,res:Response)=>{

    try {
         const address= await prismaClient.address.delete({
            where:{
                id:+req.params.id
            }
         })
         res.json( {
            success:true
         })


    } catch (error) {
        throw (new NotFoundException('Address not found',errorcode.ADDRESS_NOT_FOUND))
    }

}

export const listAll=async(req:Request,res:Response)=>{

const addresses =await prismaClient.address.findMany({
    where :{
        userId:+req.user.id
    }
})
res.json(addresses)

}