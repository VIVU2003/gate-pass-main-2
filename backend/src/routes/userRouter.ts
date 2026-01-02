import express, {Request, Response} from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { signupVal } from "../lib/validators/userValidator";
import { signinVal } from "../lib/validators/userValidator";
import { userMail } from "../lib/validators/userValidator";
import {JWT_SECRET} from "../config";
import uAuth from "../middleware/uAuth"
import sgMail from "@sendgrid/mail";
import crypto from "crypto";
import {addHours} from "date-fns";

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const generateToken = (length = 5): string => {
    return crypto.randomBytes(length).toString('hex');
};

const prisma = new PrismaClient();

router.get("/me",uAuth,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;
    const user = await prisma.user.findFirst({
        where:{
            id:userId
        },
        select:{
            id:true,
            name:true,
            parentAuth:true,
            adminAuth:true,
            parentAuthToken:true,
            rollno:true
        }
    })
    return res.json({id:user?.id,name:user?.name,rollno:user?.rollno,parentAuth:user?.parentAuth,adminAuth:user?.adminAuth,parentAuthToken:user?.parentAuthToken})
})

router.post("/signup",async(req:Request,res:Response):Promise<any>=>{
    const userBody = req.body;
    const success = signupVal.safeParse(userBody);
    if(!success.success){
        return res.status(403).json({"msg":"Wrong format"});
    }
    try{
        const user  = await prisma.user.create({
            data:userBody}
        );
        const token = jwt.sign({id:user.id}, JWT_SECRET);
        res.status(200).json({token:token});
    
    }catch(e){
        return res.status(403).json({msg:"User already exist"});
    }
    
})

router.post("/signin",async(req:Request,res:Response):Promise<any>=>{
    const signinBody = req.body;
    const success = signinVal.safeParse(signinBody);
    if(!success.success){
        return res.status(403).json({msg:"Invalid Input"})
    }
    try{
        const user = await prisma.user.findFirst({
            where:{
                email:signinBody.email,
                password:signinBody.password
            }
        })
        if(!user){
            return res.status(401).json({msg:"User does not exist"});
        }
        const token = jwt.sign({id:user.id},JWT_SECRET);
        res.status(200).json({msg:"Signin Success",token:token});
    }catch(e){
        
    }
})

router.post(
    "/send",
    uAuth,
    async (req: Request, res: Response): Promise<any> => {
      const body = req.body;
      console.log(body);
      const check = userMail.safeParse(body);
      console.log(check);
      if (!check.success) {
        return res.status(400).json({ error: "Invalid input" });
      }
      
      try {
        const parentEmail = await prisma.user.update({
          where: {
            id: req.userId,
          },
          data: {
            parentAuthToken: crypto.randomBytes(3).toString("hex"),
            parentAuthExpireAt: addHours(new Date(), 3),
          },
          select: {
            parentAuthToken: true,
            parentEmail: true,
          },
        });

        const link = `https://gate-pass-main-2.vercel.app/auth?token=${parentEmail?.parentAuthToken}`;
        
        const msg = {
          to: parentEmail?.parentEmail || '',
          from: process.env.EMAIL || '', // Must be verified in SendGrid
          subject: "Authentication Request",
          html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #333;">Leave Authentication Request</h2>
          <p style="font-size: 16px; color: #555;">Your ward has requested leave authentication. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>From Date:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${body.from}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>To Date:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${body.to}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Place to Go:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${body.place}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Reason:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${body.reason}</td>
            </tr>
          </table>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${link}" style="background-color: #007bff; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">
              Authenticate Now
            </a>
          </div>
          <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
        };

        await sgMail.send(msg);
        return res.json({ message: "Mail sent successfully" });
      } catch (e) {
        console.error("Email error:", e);
        return res.status(500).json({ error: e, message: "Mail not sent" });
      }
    }
);

router.put("/auth",async(req:Request,res:Response):Promise<any>=>{
    const token : string = (req.query as { token: string }).token;
    console.log(token);
    try{
        const user = await prisma.user.findFirst({
            where:{
                parentAuthToken:token
            }
        })

        if(!user || !user.parentAuthExpireAt || user.parentAuthExpireAt < new Date()){
            return res.status(400).json({msg:"Invalid or expired token"});
        }
        
        const updatedUser = await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                parentAuthToken:null,
                parentAuthExpireAt:null,
                parentAuth:true
            }
        })
        return res.status(200).json({msg:"Successfully authenticated"});
    }
    catch(e){
        console.error("Auth error:", e);
        return res.status(400).json({msg:"An error occurred"})
    }
})

export default router;
