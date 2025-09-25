import { errorcode, HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
    
    constructor (error:any ,message:string ,errorCode:errorcode){
        super(message ,errorCode,422,error)
    }
}