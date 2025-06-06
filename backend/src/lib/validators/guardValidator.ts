import z from "zod";
export const signupVal = z.object({
    name: z.string(),
    email:z.string().email(),
    password : z.string(),
})

export const signinVal = z.object({
    email:z.string(),
    password : z.string()
})

// model Guard{
//     id Int @id @default(autoincrement())
//     name String
//     email String @unique
//     password String
//   }