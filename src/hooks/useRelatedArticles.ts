import { useQuery } from "@tanstack/react-query"
import { getRelatedArticles } from "../services/articles"

export const useRelatedArticles = (categoryId: number | undefined, articleId: number) => {
    return useQuery({
        queryKey: ["related-articles", categoryId, articleId],
        queryFn: () => getRelatedArticles(categoryId!, articleId),
        enabled: !!categoryId,
    })
}