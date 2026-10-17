import { useParams, Link, useNavigate } from "react-router"
import { ArticleCard } from "../components/ArticleCard"
import { useArticle } from "../hooks/useArticle"
import { formatDate } from "../utils/formatDate"
import { ArticleDetailsSkeleton } from "../components/skeletons/ArticleDetailsSkeleton"
import { useRelatedArticles } from "../hooks/useRelatedArticles"
import { useAuthStore } from "../stores/authStore"
import { useDeleteArticle } from "../hooks/useDeleteArticle"

export const Article = () => {
    const { id } = useParams()
    const { data: article, isLoading, isError, refetch } = useArticle(Number(id))
    const { data: relatedArticles } = useRelatedArticles(article?.category.id, Number(id))
    const user = useAuthStore((state) => state.user)
    const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle()
    const navigate = useNavigate()
    const handleDelete = () => {
        if (window.confirm("هل انت متاكد من حذف المقال؟")) {

            deleteArticle({ id: Number(id), thumbnail: article.thumbnail }, {
                onSuccess: () => {
                    navigate(`/blog`)
                }
            })

        }
    }
    if (isLoading) return <ArticleDetailsSkeleton />
    if (isError) return <div className="text-center text-lg mt-24">حدث خطأ في تحميل المقال <br />
        <button onClick={() => refetch()} className="text-primary font-semibold underline">حاول مرة اخرى</button>
    </div>
    if (!article) return <p className="text-center text-lg mt-24">المقال غير موجود <br />  <Link to="/blog" className="text-primary font-semibold underline">الرجوع للمدونة</Link> </p>

    const isOwner = user?.id === article.author_id

    return (
        <>
            <article className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <nav aria-label="مسار التنقل" className="text-sm text-gray-500 mb-6">
                    <Link to="/blog" className="hover:text-primary transition-colors">المدونة</Link>
                    <span className="mx-2" aria-hidden="true">/</span>
                    <Link to={`/blog?category=${article.category.id}`} className="hover:text-primary transition-colors">{article.category.title}</Link>
                </nav>

                <span className="inline-block bg-primary-soft text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {article.category.title}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{article.title}</h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{article.description}</p>

                {/* Meta + owner actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-line">
                    <div className="flex items-center gap-3">
                        <span className="size-11 rounded-full bg-accent text-ink flex items-center justify-center text-lg font-semibold" aria-hidden="true">
                            {article.author.display_name.charAt(0)}
                        </span>
                        <div>
                            <p className="font-semibold">{article.author.display_name}</p>
                            <time dateTime={article.created_at} className="text-sm text-gray-500">{formatDate(article.created_at)}</time>
                        </div>
                    </div>

                    {/* Only the article's owner sees these */}
                    {isOwner && (
                        <div className="flex items-center gap-2">
                            <Link
                                to={`/articles/${article.id}/edit`}
                                className="text-sm font-semibold px-4 py-2 rounded-xl border border-line bg-white hover:border-primary hover:text-primary transition-colors"
                            >
                                تعديل
                            </Link>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                type="button"
                                className="text-sm font-semibold px-4 py-2 rounded-xl border border-red-200 bg-white text-red-700 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? "جاري الحذف..." : "حذف"}
                            </button>
                        </div>
                    )}
                </div>

                <img
                    src={article.thumbnail}
                    alt=""
                    className="w-full aspect-video object-cover rounded-2xl my-8 bg-line"
                />

                {/* whitespace-pre-line keeps the paragraphs the author typed */}
                <div className="text-lg leading-loose whitespace-pre-line">
                    {article.content}
                </div>
            </article>

            {/* Related articles */}
            {relatedArticles && relatedArticles.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">مقالات مشابهة</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedArticles.map((related) => (
                            <ArticleCard key={related.id} article={related} />
                        ))}

                    </div>
                </section>
            )}
        </>
    )
}
