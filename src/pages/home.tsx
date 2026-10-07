import { Link } from "react-router"
import { ArticleCard } from "../components/ArticleCard"

// Static data: later, getCategories + one useArticles query per category (useQueries + combine),
// each limited to 4 articles. This shape is what that combine will return.
const titlesByCategory: Record<number, string[]> = {
    1: [
        "ازاي تبدأ تتعلم React في 2026 من غير ما تتوه",
        "React Query: ليه مش محتاج useEffect عشان تجيب داتا",
        "TypeScript للمبتدئين: الأنواع اللي هتستخدمها كل يوم",
        "Git من الصفر: الأوامر اللي محتاجها فعلاً",
    ],
    2: [
        "أساسيات تصميم واجهات عربية من اليمين للشمال",
        "Tailwind CSS: نظام ألوان وخطوط في ملف واحد",
        "إزاي تختار خط عربي مريح للقراءة",
        "المسافات البيضاء: سر التصميم النضيف",
    ],
    3: [
        "يعني إيه Backend as a Service؟ ولما تستخدم Supabase",
        "ازاي ترفع مشروعك على Vercel في 5 دقايق",
        "الذكاء الاصطناعي في البرمجة: مساعد مش بديل",
        "يعني إيه API؟ شرح بمثال من الحياة",
    ],
    4: [
        "إزاي تجهز نفسك لأول إنترفيو Frontend",
        "البورتفوليو: 3 مشاريع أحسن من 20 tutorial",
        "إزاي تكتب CV مبرمج يتقري في 10 ثواني",
        "العمل remote: إزاي تلاقي أول شغلانة",
    ],
}

const categories = [
    { id: 1, title: "برمجة" },
    { id: 2, title: "تصميم" },
    { id: 3, title: "تقنية" },
    { id: 4, title: "مسيرة مهنية" },
]

const authors = ["عبدالله محسن", "سارة أحمد", "محمد علي"]

const sections = categories.map((category) => ({
    category,
    articles: titlesByCategory[category.id].map((title, i) => ({
        id: category.id * 10 + i,
        title,
        description: "ملخص قصير للمقال بيظهر في الكارت، بيقول للقارئ المقال بيتكلم عن إيه قبل ما يفتحه.",
        thumbnail: `https://picsum.photos/seed/blog-${category.id}-${i}/800/450`,
        created_at: `${20 - i * 3} سبتمبر 2026`,
        category,
        author: { display_name: authors[i % authors.length] },
    })),
}))

export const Home = () => {
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
            {sections.map(({ category, articles }) => (
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
            ))}
        </>
    )
}
