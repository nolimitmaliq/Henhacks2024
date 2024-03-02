import { Router ,Request,Response} from 'express';
import {getAllUsersHandler,loginHandler, signUpHandler} from '../controllers/userController';


const router = Router();
router.get('/',(req:Request, res:Response)=>{getAllUsersHandler(req ,res)});
router.post('/login',(req:Request, res:Response)=>{loginHandler(req,res)});
router.post('/signup',(req:Request, res:Response)=>{signUpHandler(req,res)});

module.exports = router;    