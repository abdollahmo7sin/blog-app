import { Link } from "react-router"
import { formatDate } from "../utils/formatDate"
import { useAuthStore } from "../stores/authStore"
import { useUserArticles } from "../hooks/useUserArticles"
import { useDeleteArticle } from "../hooks/useDeleteArticle"


export const MyArticles = () => {
    const user = useAuthStore(state => state.user)
    const { data: articles = [], isLoading, isError } = useUserArticles(user?.id)
    const { mutate: deleteArticle, isPending, variables } = useDeleteArticle()


    if (isLoading) {
        return <div className="flex flex-col items-center justify-center text-center mt-24">
            <h1 className="text-2xl font-bold">جاري التحميل...</h1>
        </div>
    }
    if (isError) {
        return <div className="flex flex-col items-center justify-center  text-center mt-24 ">
            <h1 className="text-2xl font-bold">حدث خطأ، حاول مرة اخرى</h1>
        </div>
    }

    const handleDelete = (id: number, thumbnail: string) => {
        if (window.confirm("هل انت متاكد من حذف المقال؟")) {

            deleteArticle({ id, thumbnail })

        }
    }

    return (
        <section className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">مقالاتي</h1>
                    <p className="text-gray-600">{articles.length} مقال منشور</p>
                </div>
                <Link
                    to="/articles/new"
                    className="bg-primary text-white font-semibold px-5 py-3 rounded-xl hover:bg-ink transition-colors"
                >
                    + مقال جديد
                </Link>
            </div>

            {/* Static: show this instead of the list when the user has no articles */}
            {articles.length === 0 ? (
                <div className="bg-white border border-dashed border-line rounded-2xl px-6 py-16 text-center">
                    <span className="size-14 rounded-2xl bg-primary-soft text-primary inline-flex items-center justify-center mb-4" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z" />
                        </svg>
                    </span>
                    <h2 className="text-xl font-bold mb-2">لسه مكتبتش أي مقال</h2>
                    <p className="text-gray-600 mb-6">ابدأ بأول مقال ليك وشارك اللي بتعرفه</p>
                    <Link to="/articles/new" className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-ink transition-colors">
                        اكتب أول مقال
                    </Link>
                </div>
            ) : (
                <ul className="flex flex-col gap-4">
                    {articles.map((article) => {
                        const isThisDeleting = isPending && variables?.id === article.id

                        return (
                            <li
                                key={article.id}
                                className="bg-white border border-line rounded-2xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center"
                            >
                                <Link to={`/blog/${article.id}`} className="shrink-0 block sm:w-40 aspect-video rounded-xl overflow-hidden bg-line">
                                    <img src={article.thumbnail} alt={article.title} loading="lazy" className="w-full h-full object-cover" />
                                </Link>

                                <div className="grow min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1.5">
                                        <span className="bg-primary-soft text-primary font-semibold px-2.5 py-0.5 rounded-full">
                                            {article.category.title}
                                        </span>
                                        <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
                                    </div>
                                    <h2 className="font-bold leading-snug truncate">
                                        <Link to={`/blog/${article.id}`} className="hover:text-primary transition-colors">
                                            {article.title}
                                        </Link>
                                    </h2>
                                    <p className="text-sm text-gray-600 line-clamp-1 mt-1">{article.description}</p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Link
                                        to={`/articles/${article.id}/edit`}
                                        className="text-sm font-semibold px-4 py-2 rounded-xl border border-line hover:border-primary hover:text-primary transition-colors"
                                    >
                                        تعديل
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(article.id, article.thumbnail)}
                                        disabled={isThisDeleting}
                                        type="button"
                                        className="text-sm font-semibold px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        {isThisDeleting ? "جاري الحذف..." : "حذف"}
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}
