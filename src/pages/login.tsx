import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { loginSchema, type LoginSchema } from "../schemas/authSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "../hooks/useAuth"

const inputClass = "w-full bg-white border border-line rounded-xl px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-red-500"
const labelClass = "block text-sm font-medium mb-1.5"

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const { mutate: loginUser, isPending, isError: authError } = useLogin()
    const navigate = useNavigate()
    const onSubmit = (data: LoginSchema) => {
        loginUser(data, {
            onSuccess: () => {
                navigate("/")
            }
        })
    }



    return (
        <section className="flex justify-center py-6 md:py-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="size-12 rounded-2xl bg-primary text-white inline-flex items-center justify-center mb-4" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>
                    </span>
                    <h1 className="text-2xl font-bold mb-2">أهلاً بيك تاني</h1>
                    <p className="text-gray-600">سجّل دخولك عشان تكتب وتعدّل مقالاتك</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-5" noValidate>
                    <div>
                        <label htmlFor="email" className={labelClass}>البريد الإلكتروني</label>
                        <input
                            {...register("email")}
                            id="email"
                            type="email"
                            dir="ltr"
                            autoComplete="email"
                            placeholder="you@example.com"
                            aria-invalid={!!errors.email}
                            aria-describedby="emailError"
                            className={`${inputClass} text-end`}
                        />
                        {errors.email && <p id="emailError" className="text-sm text-red-700 mt-1.5">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className={labelClass}>كلمة المرور</label>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            dir="ltr"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            aria-invalid={!!errors.password}
                            aria-describedby="passwordError"
                            className={`${inputClass} text-end`}
                        />
                        {errors.password && <p id="passwordError" className="text-sm text-red-700 mt-1.5">{errors.password.message}</p>}
                    </div>

                    {authError && (
                        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                            البريد الإلكتروني أو كلمة المرور غير صحيحة
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-ink transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isPending ? "جاري الدخول..." : "تسجيل الدخول"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    ماعندكش حساب؟{" "}
                    <Link to="/register" className="text-primary font-semibold hover:underline">اعمل حساب جديد</Link>
                </p>
            </div>
        </section>
    )
}
