import { useQuery } from "@tanstack/react-query"
import { getArticles, type GetArticlesParams } from "../services/articles"

export const useArticles = (params: GetArticlesParams) => {
    return useQuery({
        queryKey: ["articles", params],
        queryFn: () => getArticles(params),

    })
}