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
            category_id: ""
        }
    })
    const thumbnail = watch("thumbnail")
    const previewUrl = thumbnail?.[0] ? URL.createObjectURL(thumbnail[0]) : ""
    const { mutate: createArticle, isPending, isError } = useCreateArticle()
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

                <div className="md:w-1/2">
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
                    <span className={labelClass}>صورة المقال</span>

                    <label
                        htmlFor="thumbnail"
                        className="group relative block cursor-pointer rounded-xl border-2 border-dashed border-line bg-paper overflow-hidden transition-colors hover:border-primary focus-within:border-primary"
                    >
                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            aria-describedby="thumbnailError"
                            className="sr-only"
                            {...register("thumbnail")}
                        />

                        {previewUrl ? (
                            <>
                                <img src={previewUrl} alt="" className="w-full aspect-video object-cover" />
                                <span className="absolute inset-0 flex items-center justify-center bg-ink/50 text-white font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                                    تغيير الصورة
                                </span>
                            </>
                        ) : (
                            <span className="flex flex-col items-center justify-center gap-3 aspect-video text-center px-6">
                                <span className="size-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center" aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </span>
                                <span className="font-semibold text-ink">اضغط عشان تختار صورة</span>
                                <span className="text-xs text-gray-500">JPG أو PNG أو WEBP، وحجمها أقل من 2MB</span>
                            </span>
                        )}
                    </label>

                    {errors.thumbnail && <p id="thumbnailError" className="text-sm text-red-700 mt-1.5">{errors.thumbnail.message}</p>}
                </div>

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

                {isError && (
                    <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                        "حصلت مشكلة في حفظ المقال، حاول تاني"
                    </div>
                )}

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
