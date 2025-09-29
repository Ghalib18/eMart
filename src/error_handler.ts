import { NextFunction, Request,Response } from "express"
import { errorcode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/Internal-exception";
import { ZodError } from "zod";
import { BadRequestException } from "./exceptions/bad-request";

export const errorHandler=  (method :Function)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
          await method(req,res,next);
        }
        catch(error:any){
            let exception:HttpException;
            if(error instanceof HttpException ){
                exception=error;
            }
            else{
                if(error instanceof ZodError){
                    exception =new BadRequestException('Cant meet the zod validation',errorcode.MISSING_FIELDS,error)
                }
                else{
                    exception= new InternalException('Something went Wrong!',errorcode.INTERNAL_PROBLEM,error)
                }
                
            }
             next(exception)
        }
    }
}