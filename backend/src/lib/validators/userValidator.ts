import z from "zod";

export const signupVal = z.object({
    name: z.string(),
    email:z.string().email(),
    parentEmail : z.string().email(),
    password : z.string(),
    rollno : z.string(),
    hostelName : z.string(),
})

export const signinVal = z.object({
    email:z.string(),
    password : z.string()
})

export const userMail = z.object({
    from: z.string(),
    to: z.string(),
    place: z.string(),
    reason: z.string(),
  });