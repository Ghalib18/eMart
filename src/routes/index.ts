import {Router} from 'express'
import authRoute from './auth'
import productRouter from './product';

const rootRouter :Router=Router()

rootRouter.use('/auth',authRoute);
rootRouter.use('/product',productRouter)

export default rootRouter