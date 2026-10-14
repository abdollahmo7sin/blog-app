import { useMutation } from "@tanstack/react-query"
import { createArticle } from "../services/articles"
import type { ArticleInput } from "../schemas/articleSchema"

export const useCreateArticle = () => {

    return useMutation({
        mutationFn: ({ author_id, article }: { author_id: string, article: ArticleInput }) => createArticle(author_id, article),
    })
}