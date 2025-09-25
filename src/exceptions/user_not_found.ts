import { errorcode, HttpException } from "./root";

export class UserNotFound extends HttpException{
    constructor (message:string ,errorCode :errorcode){
        super(message , errorCode,404,null)
    }
}