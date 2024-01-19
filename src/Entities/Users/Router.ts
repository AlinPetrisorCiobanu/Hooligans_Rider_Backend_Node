import express from "express";
import { login, register } from "./Controller";

const router = express.Router()

router.post('/register',async (req,res,next)=>{
    try{
        res.status(201).json(await register(req.body))
    }
    catch(e){
        next(e)
    }
})

router.post('/login',async (req,res,next)=>{
    try{
        res.status(201).json(await login(req.body))
    }
    catch(e){
        next(e)
    }
})

export default router