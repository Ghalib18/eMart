import express ,{Request ,Response} from 'express'
import dotenv from 'dotenv'
import rootRouter from './routes';
import { PrismaClient } from '../src/generated/prisma';
import { errorMiddleware } from './middlewares/error';
import { SignUpSchema } from './models/users';
 dotenv.config({path:".env"})
 const PORT=process.env.PORT
  export const JWT_SECRET=process.env.JWT_SECRET!
const app=express();
app.use(express.json())
app.use("/api",rootRouter);
export const prismaClient=new PrismaClient({
    log:['query']
})

app.use(errorMiddleware)

app.listen(3000,()=>{
    console.log("Everything is running perfectly fine")
})
