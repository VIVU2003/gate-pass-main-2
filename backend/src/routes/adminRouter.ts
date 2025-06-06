import express, {Request, Response} from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { signupVal } from "../lib/validators/adminValidator";
import { signinVal } from "../lib/validators/adminValidator";
import aAuth from "../middleware/aAuth";

const prisma = new PrismaClient();
router.post("/signup",async(req:Request,res:Response):Promise<any>=>{
    const adminBody = req.body;
    const success = signupVal.safeParse(adminBody);
    if(!success.success){
        return res.status(403).json({"msg":"Wrong format"});
    }
    try{
        const admin  = await prisma.admin.create({
            data:adminBody}
        );
        const token = jwt.sign({id:admin.id},process.env.JWT_SECRET as string );
        res.status(200).json({token:token});
    
    }catch(e){
        return res.status(403).json({msg:"admin already exist"});
    }
    
})
router.post("/signin",async(req:Request,res:Response):Promise<any>=>{
    const signinBody = req.body;
    const success = signinVal.safeParse(signinBody);
    if(!success.success){
        return res.status(403).json({msg:"Invalid Input"})
    }
    try{
        const admin = await prisma.admin.findFirst({
            where:{
                email:signinBody.email,
                password:signinBody.password
            }
        })
        if(!admin){
            return res.status(401).json({msg:"admin does not exist"});
        }
        const token = jwt.sign({id:admin.id},process.env.JWT_SECRET as string);
        res.status(200).json({msg:"Signin Success",token:token});
    }catch(e){
        
    }
})

router.get("/getAll",aAuth,async(req:Request,res:Response):Promise<any>=>{
    const users = await prisma.user.findMany({
        where:{
            parentAuth:true,
            adminAuth:false
        },
        select:{
            id:true,
            name:true,
            email:true
        }
    })
    if(!users){
        return res.status(400).json({msg:"Error occured while fetching admins"});
    }
    return res.status(200).json({users:users});
})

router.put("/allow",aAuth,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.query.id;
    if(!userId){
        return res.status(403).json({msg:"Id Invalid or null"})
    }
    try{
    const allowedusers = await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
            adminAuth:true
        }
    })
    return res.status(200).json({msg:"Successfull"});
}catch(e){
    return res.status(400).json({msg:"An error occured"});
}
})

export default router;