import express, {Request, Response} from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


router.put("/done",async(req:Request,res:Response):Promise<any>=>{
    const id = req.query.id;
    try{
    const user = await prisma.user.update({
        where:{
            id:Number(id)
        },
        data:{
            parentAuth:false,
            adminAuth:false
        }
        
    })
        return res.status(200).json({msg:"Verified"});
    }catch(e){
        return res.status(400).json({msg:"An error occured"});
    }
})

export default router;