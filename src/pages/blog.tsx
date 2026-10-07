import { ArticleCard } from "../components/ArticleCard"
import { Pagination } from "../components/Pagination"

// Static data: will be replaced by useArticles / useCategories
const categories = [
    { id: 1, title: "برمجة" },
    { id: 2, title: "تصميم" },
    { id: 3, title: "تقنية" },
    { id: 4, title: "مسيرة مهنية" },
]

const articles = [
    {
        id: 1,
        title: "ازاي تبدأ تتعلم React في 2026 من غير ما تتوه",
        description: "خطة عملية خطوة بخطوة: من أساسيات JavaScript لحد أول مشروع حقيقي ترفعه live وتحطه في البورتفوليو.",
        thumbnail: "https://picsum.photos/seed/react/800/450",
        created_at: "5 أكتوبر 2026",
        category: { id: 1, title: "برمجة" },
        author: { display_name: "عبدالله محسن" },
    },
    {
        id: 2,
        title: "أساسيات تصميم واجهات عربية من اليمين للشمال",
        description: "إزاي تتعامل مع الاتجاه والمحاذاة والخطوط العربية عشان التصميم يبان طبيعي ومريح للقارئ.",
        thumbnail: "https://picsum.photos/seed/rtl/800/450",
        created_at: "2 أكتوبر 2026",
        category: { id: 2, title: "تصميم" },
        author: { display_name: "سارة أحمد" },
    },
    {
        id: 3,
        title: "يعني إيه Backend as a Service؟ ولما تستخدم Supabase",
        description: "مقارنة بسيطة بين إنك تبني API بنفسك وإنك تستخدم خدمة جاهزة، ومميزات وعيوب كل طريقة.",
        thumbnail: "https://picsum.photos/seed/supabase/800/450",
        created_at: "28 سبتمبر 2026",
        category: { id: 3, title: "تقنية" },
        author: { display_name: "محمد علي" },
    },
    {
        id: 4,
        title: "إزاي تجهز نفسك لأول إنترفيو Frontend",
        description: "الأسئلة اللي بتتكرر، وإزاي تفهمها بدل ما تحفظها، وإزاي ترد لما يجيلك سؤال مش عارفه.",
        thumbnail: "https://picsum.photos/seed/interview/800/450",
        created_at: "25 سبتمبر 2026",
        category: { id: 4, title: "مسيرة مهنية" },
        author: { display_name: "عبدالله محسن" },
    },
    {
        id: 5,
        title: "Tailwind CSS: نظام ألوان وخطوط في ملف واحد",
        description: "استخدام @theme في Tailwind v4 عشان تعرّف ألوان وخطوط المشروع مرة واحدة وتستخدمها في كل مكان.",
        thumbnail: "https://picsum.photos/seed/tailwind/800/450",
        created_at: "20 سبتمبر 2026",
        category: { id: 2, title: "تصميم" },
        author: { display_name: "سارة أحمد" },
    },
    {
        id: 6,
        title: "React Query: ليه مش محتاج useEffect عشان تجيب داتا",
        description: "الكاش، وإعادة المحاولة، وحالات التحميل والخطأ، وإزاي React Query بيحل مشاكل كتير لوحده.",
        thumbnail: "https://picsum.photos/seed/query/800/450",
        created_at: "15 سبتمبر 2026",
        category: { id: 1, title: "برمجة" },
        author: { display_name: "محمد علي" },
    },
]

export const Blog = () => {
    const activeCategory = null as number | null // static: will come from the URL search params

    return (
        <section>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">المدونة</h1>
                <p className="text-gray-600">مقالات عن البرمجة والتصميم والتقنية</p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 items-center mb-8">
                <button className={`rounded-xl cursor-pointer px-4 py-2.5 ${activeCategory === null ? "bg-primary text-white" : "bg-white text-ink border border-line hover:border-primary"}`}>
                    الكل
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`rounded-xl cursor-pointer px-4 py-2.5 ${activeCategory === cat.id ? "bg-primary text-white" : "bg-white text-ink border border-line hover:border-primary"}`}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            <Pagination page={1} totalPages={5} onChange={(p: number) => console.log(p)} />
        </section>
    )
}
