import express from "express";
import { list_active_events, new_event } from "./Controller";
import { validateToken } from "../../Middleware/Authorization";
import { AuthenticatedRequest } from "../../Types/Type_Auth";

const router = express.Router()

router.post('/new_event', validateToken ,async (req:AuthenticatedRequest , res , next)=>{
    try{
        res.status(200).json(await new_event(req.user! , req.body))
    }
    catch(e){
        next(e)
    }
})

router.get('/active_events/:page?', validateToken ,async (req:AuthenticatedRequest , res , next)=>{
    try{
        res.status(200).json(await list_active_events(req.user! , req.params.page))
    }
    catch(e){
        next(e)
    }
})

export default router