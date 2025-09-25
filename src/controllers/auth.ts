import {Request,Response} from 'express'
import { JWT_SECRET, prismaClient } from '..';
import {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken'


// for signup-part....
export const signup= async(req:Request,res:Response)=>{
     const {name, email,password}=req.body;
     if(!name||!email||!password){
         return res.json({
            message:"all field are required"
        })
     }
     let user=await prismaClient.user.findFirst({where:{email}})
     if(user){
          return res.json({
            message:"user already exist"
        })
     }
     user=await prismaClient.user.create({
        data:{
            name ,
            email,
            password :hashSync(password ,10)
        }
     })
     res.json(user)
}

// for login part....

export const login= async (req:Request,res:Response)=>{
    const {email ,password}=req.body
    if(!email||!password){
        return res.json({
            error:"all fields are required"
        })
    }
    const user=await prismaClient.user.findFirst({where:{email}})

    if(!user){
        return res.json({
            error:"User does't exist"
        })
    }
    if(!compareSync(password,user.password)){
        return res.json({
            error:"Password is incorrect"
        })
    }

    const token=jwt.sign({
        userId:user.id
    },JWT_SECRET)

    res.json({user,token})
    
}