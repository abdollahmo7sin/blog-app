import { z } from 'zod'

export const articleSchema = z.object({
    title: z.string().min(3, "العنوان لا يقل عن 3 أحرف"),
    description: z.string().min(1, "الوصف مطلوب"),
    content: z.string().min(1, "المحتوى مطلوب"),
    category_id: z.coerce.number().positive("التصنيف مطلوب"),
    thumbnail: z.instanceof(FileList).refine(files => files.length > 0, "الصورة مطلوبة").refine(files => files[0]?.size < 1024 * 1024 * 2, "الصورة أكبر من 2 ميجا").refine(files => ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type), "الصورة غير مدعومة"),

})

export type ArticleInput = z.infer<typeof articleSchema>


export const editArticleSchema = articleSchema.extend({
    thumbnail: z.instanceof(FileList)
        .refine(files => files.length === 0 || (files[0] && files[0]?.size < 1024 * 1024 * 2), "الصورة أكبر من 2 ميجا")
        .refine(files => !files[0] || ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type), "الصورة غير مدعومة"),
})