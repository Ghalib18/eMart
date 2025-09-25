//  we have to create the error class for the error that is going to happens in our project , here we will extends the error  class give by the javascript and  we will custmized it for our use...

// message , status code , error codes

 export class HttpException extends Error {
    message :string;
    errorCode:errorcode;
    statusCode:number;
    errors:any;

    constructor(message:string ,errorCode:errorcode ,statusCode:number,error:any){
        super()
        this.message=message,
        this.errorCode=errorCode,
        this.statusCode=statusCode,
        this.errors=error
        
    }
}
export enum errorcode{
    USER_NOT_FOUND=1001,
    USER_ALREADY_EXISTS=1002,
    INCORRECT_PASSWORD=1003,
    MISSING_FIELDS=1004,
    UNPROCESSABLE_ENTITY=1000,
    INTERNAL_PROBLEM=1111,

}