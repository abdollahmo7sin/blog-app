import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import type { RegisterSchema } from "../schemas/authSchemas";
import { registerSchema } from "../schemas/authSchemas";
import { useRegister } from "../hooks/useAuth";

const inputClass = "w-full bg-white border border-line rounded-xl px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-red-500"
const labelClass = "block text-sm font-medium mb-1.5"

export const Register = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            displayName: "",
            username: "",
            email: "",
            password: ""
        }
    })
    const { mutate: registerUser, isPending, error: authError } = useRegister()

    const onSubmit = (data: RegisterSchema) => {
        registerUser(data, {
            onSuccess: () => {
                navigate("/")
            }
        })
    }

    return (
        <section className="flex justify-center py-6 md:py-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="size-12 rounded-2xl bg-accent text-ink inline-flex items-center justify-center mb-4" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </span>
                    <h1 className="text-2xl font-bold mb-2">اعمل حساب جديد</h1>
                    <p className="text-gray-600">انضم واكتب أول مقال ليك في دقايق</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-5" noValidate>
                    <div>
                        <label htmlFor="displayName" className={labelClass}>الاسم</label>
                        <input
                            {...register("displayName")}
                            id="displayName"
                            type="text"
                            autoComplete="name"
                            placeholder="عبدالله محسن"
                            aria-invalid={!!errors.displayName}
                            aria-describedby="displayNameError"
                            className={inputClass}
                        />
                        {errors.displayName
                            ? <p id="displayNameError" className="text-sm text-red-700 mt-1.5">{errors.displayName.message}</p>
                            : <p className="text-xs text-gray-500 mt-1.5">ده الاسم اللي هيظهر على مقالاتك</p>}
                    </div>

                    <div>
                        <label htmlFor="username" className={labelClass}>اسم المستخدم</label>
                        <input
                            {...register("username")}
                            id="username"
                            type="text"
                            dir="ltr"
                            autoComplete="username"
                            placeholder="abdallah"
                            aria-invalid={!!errors.username}
                            aria-describedby="usernameError"
                            className={`${inputClass} text-end`}
                        />
                        {errors.username
                            ? <p id="usernameError" className="text-sm text-red-700 mt-1.5">{errors.username.message}</p>
                            : <p className="text-xs text-gray-500 mt-1.5">حروف إنجليزي وأرقام بس، ومن غير مسافات</p>}
                    </div>

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
                            autoComplete="new-password"
                            placeholder="••••••••"
                            aria-invalid={!!errors.password}
                            aria-describedby="passwordError"
                            className={`${inputClass} text-end`}
                        />
                        {errors.password
                            ? <p id="passwordError" className="text-sm text-red-700 mt-1.5">{errors.password.message}</p>
                            : <p className="text-xs text-gray-500 mt-1.5">6 حروف على الأقل</p>}
                    </div>

                    {authError && (
                        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                            حصلت مشكلة في إنشاء الحساب، جرّب اسم مستخدم أو بريد تاني
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-ink transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isPending ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    عندك حساب بالفعل؟{" "}
                    <Link to="/login" className="text-primary font-semibold hover:underline">سجّل دخول</Link>
                </p>
            </div>
        </section>
    )
}
