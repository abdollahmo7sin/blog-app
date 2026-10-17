import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateArticle } from "../services/articles"
import type { ArticleInput } from "../schemas/articleSchema"
import { uploadThumbnail } from "../services/storage"
export const useUpdateArticle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, author_id, formData, oldThumbnail }: {
            id: number, author_id: string, formData: ArticleInput, oldThumbnail: string
        }) => {
            const newFile = formData.thumbnail[0]

            let thumbnail = oldThumbnail
            if (newFile) {
                thumbnail = await uploadThumbnail(newFile, author_id)
            }

            return updateArticle(id, { ...formData, thumbnail })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["articles"] })
            queryClient.invalidateQueries({ queryKey: ["home"] })
            queryClient.invalidateQueries({ queryKey: ["related-articles"] })
            queryClient.invalidateQueries({ queryKey: ["article", data.id] })
        }


    })
}