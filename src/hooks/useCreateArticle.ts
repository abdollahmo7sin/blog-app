import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createArticle } from "../services/articles"
import type { ArticleInput } from "../schemas/articleSchema"
import { uploadThumbnail } from "../services/storage"
export const useCreateArticle = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ author_id, article }: { author_id: string, article: ArticleInput }) => {

            const thumbnail_url = await uploadThumbnail(article.thumbnail[0], author_id)
            const res = await createArticle(author_id, { ...article, thumbnail: thumbnail_url })
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] })
            queryClient.invalidateQueries({ queryKey: ["home"] })
            queryClient.invalidateQueries({ queryKey: ["related-articles"] })
        }
    })
}