import { errorcode, HttpException } from "./root";

 export class Unauthorized extends HttpException {
    constructor (message :string ,errorCode:errorcode,error?:any){
        super(message ,errorCode,401,error)
    }
 }