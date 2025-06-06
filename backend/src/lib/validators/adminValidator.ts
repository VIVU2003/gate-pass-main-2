import z from "zod";
export const signupVal = z.object({
    name: z.string(),
    email:z.string().email(),
    password : z.string(),
    hostelName : z.string(),
})

export const signinVal = z.object({
    email:z.string(),
    password : z.string()
})