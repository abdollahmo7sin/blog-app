import { useQuery } from "@tanstack/react-query"
import { getUserArticles } from "../services/articles"

export const useUserArticles = (userId: string | undefined) => {

    return useQuery({
        queryKey: ["articles", "user", userId],
        queryFn: () => getUserArticles(userId!),
        enabled: !!userId
    })
}