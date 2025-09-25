import { errorcode, HttpException } from "./root";

export class BadRequestException extends HttpException {
    constructor (message:string ,errorCode:errorcode){
        super(message,errorCode,400,null)
    }
}