import { z } from 'zod'

export const articleSchema = z.object({
    title: z.string().min(3, "العنوان لا يقل عن 3 أحرف"),
    description: z.string().min(1, "الوصف مطلوب"),
    content: z.string().min(1, "المحتوى مطلوب"),
    category_id: z.coerce.number().positive("التصنيف مطلوب"),
    thumbnail: z.url("رابط الصورة غير صالح"),

})

export type ArticleInput = z.infer<typeof articleSchema>