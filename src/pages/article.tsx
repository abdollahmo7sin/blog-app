import { Link } from "react-router"
import { ArticleCard } from "../components/ArticleCard"

// Static data: will be replaced by useArticle(id) and related articles from the same category
const article = {
    id: 1,
    title: "ازاي تبدأ تتعلم React في 2026 من غير ما تتوه",
    description: "خطة عملية خطوة بخطوة: من أساسيات JavaScript لحد أول مشروع حقيقي ترفعه live وتحطه في البورتفوليو.",
    content: `أول غلطة بيقع فيها أي حد بيبدأ React إنه يبدأ بـ React نفسها. React مكتبة مبنية على JavaScript، فلو مش فاهم الـ functions والـ arrays والـ objects كويس، هتحس إن كل حاجة سحر.

ابدأ بأساسيات JavaScript الحديثة: الـ arrow functions، والـ destructuring، والـ spread، و map و filter، والـ promises و async/await. دول هتستخدمهم في كل سطر React تقريباً.

بعد كده ادخل على React بمشروع صغير حقيقي، مش tutorial وخلاص. مشروع زي تطبيق طقس أو قائمة مهام، تتعلم فيه الـ components والـ props والـ state والـ effects وإنت بتحل مشكلة فعلية.

لما تتمكن من الأساسيات، اتعلم إزاي تجيب داتا من API بطريقة صح باستخدام React Query، وإزاي تدير الـ state المشتركة بمكتبة بسيطة زي Zustand.

وفي الآخر: ارفع كل مشروع live، وحط اللينك في البورتفوليو. المشروع اللي محدش يقدر يفتحه، كأنه مش موجود.`,
    thumbnail: "https://picsum.photos/seed/react/1200/630",
    created_at: "5 أكتوبر 2026",
    category: { id: 1, title: "برمجة" },
    author: { display_name: "عبدالله محسن" },
}

const relatedArticles = [
    {
        id: 6,
        title: "React Query: ليه مش محتاج useEffect عشان تجيب داتا",
        description: "الكاش، وإعادة المحاولة، وحالات التحميل والخطأ، وإزاي React Query بيحل مشاكل كتير لوحده.",
        thumbnail: "https://picsum.photos/seed/query/800/450",
        created_at: "15 سبتمبر 2026",
        category: { id: 1, title: "برمجة" },
        author: { display_name: "محمد علي" },
    },
    {
        id: 7,
        title: "TypeScript للمبتدئين: الأنواع اللي هتستخدمها كل يوم",
        description: "string و number و union types و generics، بأمثلة صغيرة من مشاريع React حقيقية.",
        thumbnail: "https://picsum.photos/seed/typescript/800/450",
        created_at: "10 سبتمبر 2026",
        category: { id: 1, title: "برمجة" },
        author: { display_name: "سارة أحمد" },
    },
    {
        id: 8,
        title: "Git من الصفر: الأوامر اللي محتاجها فعلاً",
        description: "init و add و commit و push و branch، وإزاي ترجع لو حاجة باظت من غير ما تخسر شغلك.",
        thumbnail: "https://picsum.photos/seed/git/800/450",
        created_at: "3 سبتمبر 2026",
        category: { id: 1, title: "برمجة" },
        author: { display_name: "عبدالله محسن" },
    },
]

export const Article = () => {
    const isOwner = true // static: later, compare article.author_id with the logged-in user's id

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
                            <time dateTime={article.created_at} className="text-sm text-gray-500">{article.created_at}</time>
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
                                type="button"
                                className="text-sm font-semibold px-4 py-2 rounded-xl border border-red-200 bg-white text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                                حذف
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
            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6">مقالات مشابهة</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedArticles.map((related) => (
                        <ArticleCard key={related.id} article={related} />
                    ))}
                </div>
            </section>
        </>
    )
}
