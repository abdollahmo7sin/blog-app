import { useQuery } from "@tanstack/react-query"
import { getArticle } from "../services/articles"

export const useArticle = (id: number) => {
    return useQuery({
        queryKey: ["article", id],
        queryFn: () => getArticle(id),

    })
}