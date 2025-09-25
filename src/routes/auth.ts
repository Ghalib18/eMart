import {Router} from 'express'
import { login, signup } from '../controllers/auth';
import { errorHandler } from '../error_handler';

const authRoute:Router=Router();


authRoute.post('/signup',errorHandler(signup))
authRoute.post('/login',errorHandler(login))

export default authRoute