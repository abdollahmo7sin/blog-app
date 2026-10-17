import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteArticle } from "../services/articles"
import { deleteThumbnail } from "../services/storage"
export const useDeleteArticle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, thumbnail }: { id: number, thumbnail: string }) => {
            await deleteArticle(id)
            await deleteThumbnail(thumbnail)
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["articles"] })
            queryClient.invalidateQueries({ queryKey: ["home"] })
            queryClient.invalidateQueries({ queryKey: ["related-articles"] })
            queryClient.invalidateQueries({ queryKey: ["article", id] })
        }
    })
}