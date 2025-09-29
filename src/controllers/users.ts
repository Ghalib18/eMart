import { success } from "zod"
import { prismaClient } from ".."
import { errorcode } from "../exceptions/root"
import { NotFoundException } from "../exceptions/user_not_found"
import { AddressSchema, UpdateUserSchema } from "../models/users"
import { Request,Response } from "express"
import { Address } from "../generated/prisma"
import { BadRequestException } from "../exceptions/bad-request"

//  adding the address for users
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

// deleting the addresses from users list

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

// list all the address that are present in given users list...

export const listAll=async(req:Request,res:Response)=>{

const addresses =await prismaClient.address.findMany({
    where :{
        userId:+req.user.id
    }
})
res.json(addresses)

}

//  updating the user  details such as billingAddressId , shipingAddressId and name of the user.......

export const UpdatingUser =async (req:Request,res:Response)=>{
  const ValidateData= UpdateUserSchema.parse(req.body)
  let shippingAddress:Address;
  let billingAddress :Address;
  if(ValidateData.defaultShipingAddressId){
  try{
    shippingAddress=await prismaClient.address.findFirstOrThrow({
        where :{
            id:ValidateData.defaultShipingAddressId
        }
    })
  }
  catch(error){
    throw (new NotFoundException('Address not found' ,errorcode.ADDRESS_NOT_FOUND))
  }
  if(shippingAddress.userId!=req.user.id){
    throw new BadRequestException("Address does not belong to the user",errorcode.ADDRESS_NOT_BELONG_TO_USER)
  }
}
 if(ValidateData.defaultBillingAddressId){
  try{
    billingAddress=await prismaClient.address.findFirstOrThrow({
        where :{
            id:ValidateData.defaultBillingAddressId
        }
    })
  }
  catch(error){
    throw (new NotFoundException('Address not found' ,errorcode.ADDRESS_NOT_FOUND))
  }
  if(billingAddress.userId!=req.user.id){
    throw new BadRequestException("Address does not belong to the user",errorcode.ADDRESS_NOT_BELONG_TO_USER)
  }
}

  const updatedUser = await prismaClient.user.update({
    where : {
      id: req.user.id
    },
    data:ValidateData
  })
res.json(ValidateData)

}