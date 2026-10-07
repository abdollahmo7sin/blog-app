import { Link } from "react-router"

// Static for now: this shape matches what Supabase will return later
// when articles are joined with their category and author.
type ArticleCardProps = {
    article: {
        id: number
        title: string
        description: string
        thumbnail: string
        created_at: string
        category: { id: number; title: string }
        author: { display_name: string }
    }
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <article className="group bg-white border border-line rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <Link to={`/blog/${article.id}`} className="block aspect-video overflow-hidden bg-line">
                <img
                    src={article.thumbnail}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </Link>

            <div className="p-5 flex flex-col gap-3 grow">
                <span className="self-start bg-primary-soft text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category.title}
                </span>

                <h3 className="text-lg font-bold leading-snug line-clamp-2">
                    <Link to={`/blog/${article.id}`} className="hover:text-primary transition-colors">
                        {article.title}
                    </Link>
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {article.description}
                </p>

                <div className="mt-auto pt-4 border-t border-line flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="size-7 rounded-full bg-accent text-ink flex items-center justify-center font-semibold" aria-hidden="true">
                            {article.author.display_name.charAt(0)}
                        </span>
                        <span>{article.author.display_name}</span>
                    </div>
                    <time dateTime={article.created_at}>{article.created_at}</time>
                </div>
            </div>
        </article>
    )
}
