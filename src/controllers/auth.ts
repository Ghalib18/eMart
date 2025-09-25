import {NextFunction, Request,Response} from 'express'
import { JWT_SECRET, prismaClient } from '..';
import {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { BadRequestException } from '../exceptions/bad-request';
import { errorcode } from '../exceptions/root';
import { UserNotFound } from '../exceptions/user_not_found';
import { IncorrectPassword } from '../exceptions/Incorrect_password';


// for signup-part....
export const signup= async(req:Request,res:Response,next:NextFunction)=>{
     const {name, email,password}=req.body;
     if(!name||!email||!password){
       next(new BadRequestException('All the fields are necessary',errorcode.MISSING_FIELDS))
     }
     let user=await prismaClient.user.findFirst({where:{email}})
     if(user){
         next(new BadRequestException('User already exists',errorcode.USER_ALREADY_EXISTS))
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

export const login= async (req:Request,res:Response ,next:NextFunction)=>{
    const {email ,password}=req.body
    if(!email||!password){
       next(new BadRequestException('All the fields are necessary',errorcode.MISSING_FIELDS))
    }
    const user=await prismaClient.user.findFirst({where:{email}})

    if(!user){
       next( new UserNotFound('User not found',errorcode.USER_NOT_FOUND))
       return
    }
    if(!compareSync(password,user.password)){
       next (new IncorrectPassword('Password is incorrect',errorcode.INCORRECT_PASSWORD))
       return
    }

    const token=jwt.sign({
        userId:user.id
    },JWT_SECRET)

    res.json({user,token})
    
}