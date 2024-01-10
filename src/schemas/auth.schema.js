import { z } from "zod";
export const registerSchema = z.object({
    cedula: z.string({
        required_error: "Cedula is required"
    }),
    username: z.string({
        required_error: "Username is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 characters long"
    })
})

export const loginSchema = z.object({
    cedula: z.string({
        required_error: "Email is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Passwrd must be at least 6 characters long"
    })
})