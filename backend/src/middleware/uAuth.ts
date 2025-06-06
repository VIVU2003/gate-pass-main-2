import express,{Response,Request,NextFunction} from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
interface PayLoad{
    id : number
}
declare module "express-serve-static-core" {
    interface Request {
      userId?: number;
    }
  }

function uAuth(req:Request,res:Response,next:NextFunction){
    try{
    const token = req.headers.authorization || "";
    
    const decoded = jwt.verify(token,JWT_SECRET) as PayLoad;
    if(!decoded){
        res.status(403).json({e:"eror"});
        return;
    }
    req.userId = decoded.id;
    console.log(req.userId);
    next();
    }catch(e){
        res.status(403).json({e:e});
        return;
    }
    
}
export default uAuth;
