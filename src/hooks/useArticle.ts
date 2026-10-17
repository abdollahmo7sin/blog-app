import { useQuery } from "@tanstack/react-query"
import { getArticle } from "../services/articles"

export const useArticle = (id: number | undefined) => {
    return useQuery({
        queryKey: ["article", id],
        queryFn: () => getArticle(id!),
        enabled: !!id

    })
}