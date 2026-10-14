import { Link, useNavigate } from "react-router"
import { useCreateArticle } from "../hooks/useCreateArticle"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { articleSchema, type ArticleInput } from "../schemas/articleSchema"
import { useAuthStore } from "../stores/authStore"
import { useCategories } from "../hooks/useCategories"

const inputClass = "w-full bg-white border border-line rounded-xl px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-red-500"
const labelClass = "block text-sm font-medium mb-1.5"




export const ArticleForm = () => {
    const user = useAuthStore(s => s.user)
    const { data: categories, isLoading } = useCategories()
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            thumbnail: "",
            category_id: ""
        }
    })
    const thumbnail = watch("thumbnail")
    const { mutate: createArticle, isPending } = useCreateArticle()
    const navigate = useNavigate()

    const isEdit = false // static: true when the route has an :id (/articles/:id/edit)

    const onSubmit = (data: ArticleInput) => {
        if (!user) return
        createArticle({ author_id: user.id, article: data }, {
            onSuccess: (data) => {
                navigate(`/blog/${data.id}`)
            }
        })
    }
    return (
        <section className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{isEdit ? "تعديل المقال" : "اكتب مقال جديد"}</h1>
                <p className="text-gray-600">
                    {isEdit ? "عدّل اللي محتاجه واحفظ التغييرات" : "شارك اللي بتعرفه مع الناس، خلّيه بسيط وواضح"}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-6" noValidate>
                <div>
                    <label htmlFor="title" className={labelClass}>عنوان المقال</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="مثلاً: إزاي تبدأ مع React Query"
                        aria-describedby="titleError"
                        className={`${inputClass} text-lg font-semibold`}
                        {...register("title")}
                    />
                    {errors.title && <p id="titleError" className="text-sm text-red-700 mt-1.5">{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="description" className={labelClass}>وصف مختصر</label>
                    <textarea
                        id="description"
                        rows={2}
                        placeholder="سطر أو اتنين بيظهروا في كارت المقال"
                        aria-describedby="descriptionError"
                        className={`${inputClass} resize-none`}
                        {...register("description")}
                    />
                    <p className="text-xs text-gray-500 mt-1.5">بيظهر تحت العنوان في صفحة المدونة</p>
                    {errors.description && <p id="descriptionError" className="text-sm text-red-700 mt-1.5">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category_id" className={labelClass}>التصنيف</label>
                        <select
                            id="category_id"
                            aria-describedby="categoryError"
                            className={`${inputClass} cursor-pointer`}
                            {...register("category_id")}
                        >
                            <option value="" disabled>اختار تصنيف</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                        {errors.category_id && <p id="categoryError" className="text-sm text-red-700 mt-1.5">{errors.category_id.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="thumbnail" className={labelClass}>رابط الصورة</label>
                        <input
                            id="thumbnail"
                            type="url"
                            dir="ltr"
                            placeholder="https://..."
                            aria-describedby="thumbnailError"
                            className={`${inputClass} text-end`}
                            {...register("thumbnail")}
                        />
                        {errors.thumbnail && <p id="thumbnailError" className="text-sm text-red-700 mt-1.5">{errors.thumbnail.message}</p>}
                    </div>
                </div>

                {thumbnail && (
                    <img
                        src={thumbnail}
                        alt=""
                        className="w-full aspect-video object-cover rounded-xl bg-line"
                    />
                )}

                <div>
                    <label htmlFor="content" className={labelClass}>المحتوى</label>
                    <textarea
                        id="content"
                        rows={14}
                        placeholder="اكتب مقالك هنا... سيب سطر فاضي بين كل فقرة والتانية"
                        aria-describedby="contentError"
                        className={`${inputClass} leading-loose`}
                        {...register("content")}
                    />
                    {errors.content && <p id="contentError" className="text-sm text-red-700 mt-1.5">{errors.content.message}</p>}
                </div>

                {/* Static: show only when the mutation fails */}
                {/* <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    حصلت مشكلة في حفظ المقال، حاول تاني
                </div> */}

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-line">
                    <Link
                        to="/blog"
                        className="font-semibold px-6 py-3 rounded-xl border border-line hover:border-primary hover:text-primary transition-colors"
                    >
                        إلغاء
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-ink transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isPending ? "جاري الحفظ..." : isEdit ? "حفظ التغييرات" : "نشر المقال"}
                    </button>
                </div>
            </form>
        </section>
    )
}
