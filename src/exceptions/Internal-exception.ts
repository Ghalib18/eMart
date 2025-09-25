import { errorcode, HttpException } from "./root";

export class InternalException extends HttpException{
    constructor (message:string ,errorCode:errorcode,error :any){
        super(message ,errorCode,500,error)
    }
}