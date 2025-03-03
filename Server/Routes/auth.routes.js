import {Router} from 'express';
import { registro } from '../Controllers/auth.controller.js'; // si el archivo está en el directorio models



const router = Router();
router.post('/register', registro);
router.post('/login',);



router.post('/logout',(req,res)=>{});

router.post('/protected',(req,res)=>{});


export default router;