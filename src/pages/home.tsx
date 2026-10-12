import { Link } from "react-router"
import { ArticleCard } from "../components/ArticleCard"
import { useHomeSections } from "../hooks/useHomeSections"
import { ArticleCardSkeleton } from "../components/skeletons/ArticleCardSkeleton"




export const Home = () => {
    const { sections, isLoading, isError } = useHomeSections()
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-primary text-white px-6 py-14 md:px-14 md:py-20">
                <div className="absolute -top-16 -left-16 size-64 rounded-full bg-white/10" aria-hidden="true" />
                <div className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-accent/30" aria-hidden="true" />

                <div className="relative max-w-2xl">
                    <span className="inline-block bg-white/15 text-sm px-3 py-1 rounded-full mb-5">مدونة عربية للمطورين</span>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
                        اتعلم، اكتب، <span className="text-accent">وشارك</span> اللي بتعرفه
                    </h1>
                    <p className="text-lg text-white/80 leading-relaxed mb-8">
                        مقالات عملية عن البرمجة والتصميم والتقنية، مكتوبة بالعربي ببساطة. ولو عندك حاجة تقولها، اكتب مقالك وشاركه.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/blog" className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent hover:text-ink transition-colors">
                            تصفح المقالات
                        </Link>
                        <Link to="/articles/new" className="border border-white/40 font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                            اكتب مقال
                        </Link>
                    </div>
                </div>
            </section>

            {/* One section per category */}
            {isLoading &&
                <section className="mt-16">
                    <div className="flex items-end justify-between gap-4 mb-6">
                        <h2 className="text-2xl font-bold bg-gray-200 w-32 h-8 rounded animate-pulse"></h2>
                        <span className="bg-gray-200 w-24 h-6 rounded animate-pulse"></span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        <ArticleCardSkeleton count={4} />

                    </div>
                </section>
            }

            {
                isError && (
                    <p className="text-red-500 text-center">حدث خطأ في تحميل المقالات</p>
                )
            }

            {
                sections.filter((s) => s.articles.length > 0)?.map(({ category, articles }) => (
                    <section key={category.id} className="mt-16">
                        <div className="flex items-end justify-between gap-4 mb-6">
                            <h2 className="text-2xl font-bold">{category.title}</h2>
                            <Link
                                to={`/blog?category=${category.id}`}
                                className="text-sm font-semibold text-primary hover:text-ink transition-colors shrink-0"
                            >
                                عرض الكل ←
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {articles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </section>
                ))
            }
        </>
    )
}
