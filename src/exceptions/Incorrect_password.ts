import { errorcode, HttpException } from "./root";

export class IncorrectPassword extends HttpException{
    constructor (message:string ,errorCode:errorcode){
        super(message ,errorCode,401,null)
    }
}

