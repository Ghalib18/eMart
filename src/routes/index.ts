import {Router} from 'express'
import authRoute from './auth'
import productRouter from './product';
import addressRouter from './users';


const rootRouter :Router=Router()

rootRouter.use('/auth',authRoute);
rootRouter.use('/product',productRouter)
rootRouter.use('/address',addressRouter)

export default rootRouter