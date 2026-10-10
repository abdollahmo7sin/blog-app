import { ArticleCard } from "../components/ArticleCard"
import { Pagination } from "../components/Pagination"
import { useArticles } from "../hooks/useArticles"
import { useCategories } from "../hooks/useCategories"
import { ArticleCardSkeleton } from "../components/skeletons/ArticleCardSkeleton"
import { useSearchParams } from "react-router"




export const Blog = () => {
    const LIMIT = 6;
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = Number(searchParams.get("category")) || null
    const rawPage = Number(searchParams.get("page")) || 1
    const page = rawPage < 1 ? 1 : rawPage
    const { data: categories, isError, isLoading } = useCategories()
    const { data, isError: isArticlesError, isLoading: isArticlesLoading } = useArticles({ page, limit: LIMIT, categoryId: activeCategory })
    const articles = data?.articles;

    const totalPages = Math.ceil((data?.total ?? 0) / LIMIT)


    return (
        <section>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">المدونة</h1>
                <p className="text-gray-600">مقالات عن البرمجة والتصميم والتقنية</p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 items-center mb-8">
                <button
                    onClick={() => setSearchParams({})}
                    className={`rounded-xl cursor-pointer px-4 py-2.5 ${activeCategory === null ? "bg-primary text-white" : "bg-white text-ink border border-line hover:border-primary"}`}>
                    الكل
                </button>
                {isLoading && (
                    <>
                        <span className="h-11 w-20 rounded-xl bg-line animate-pulse" />
                        <span className="h-11 w-20 rounded-xl bg-line animate-pulse" />
                        <span className="h-11 w-20 rounded-xl bg-line animate-pulse" />
                        <span className="h-11 w-20 rounded-xl bg-line animate-pulse" />
                    </>
                )}
                {isError && <div className="text-center">...حدث خطأ</div>}
                {categories?.map((cat) => (
                    <button
                        onClick={() => setSearchParams({ category: String(cat.id), page: "1" })}
                        key={cat.id}
                        className={`rounded-xl cursor-pointer px-4 py-2.5 ${activeCategory === cat.id ? "bg-primary text-white" : "bg-white text-ink border border-line hover:border-primary"}`}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isArticlesLoading && (
                    <ArticleCardSkeleton count={LIMIT} />
                )}
                {isArticlesError && <div className="col-span-full">...حدث خطأ</div>}
                {articles?.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={(newPage) => {
                setSearchParams(prev => { prev.set('page', String(newPage)); return prev })
            }} />
        </section>
    )
}
