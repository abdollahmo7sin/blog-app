import { z } from "zod"

export const registerSchema = z.object({
    displayName: z.string().min(2, "الاسم لا يقل عن حرفين").max(30, "الاسم لا يزيد عن 30 حرف"),
    username: z.string().min(2, "اسم المستخدم لا يقل عن حرفين").max(20, "اسم المستخدم لا يزيد عن 20 حرف")
        .regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يجب أن يحتوي على حروف إنجليزية وأرقام وشرطة سفلية فقط"),
    email: z.email("البريد الإلكتروني غير صالح"),
    password: z.string().min(6, "كلمة المرور لا تقل عن 6 حروف")
})

export type RegisterSchema = z.infer<typeof registerSchema>


export const loginSchema = z.object({
    email: z.email("البريد الإلكتروني مطلوب"),
    password: z.string().min(1, "كلمة المرور مطلوبة")
})

export type LoginSchema = z.infer<typeof loginSchema>