import { useQueries } from "@tanstack/react-query";
import { getArticles } from "../services/articles";
import { useCategories } from "./useCategories";

export const useHomeSections = () => {
    const { data: categories, isLoading } = useCategories()

    return useQueries({
        queries: (categories ?? []).map((category) => ({
            queryKey: ["home", category.id],
            queryFn: () => getArticles({ categoryId: category.id, limit: 4 }),
        })),
        combine: (results) => {
            return {
                isLoading: results.some((result) => result.isLoading) || isLoading,
                isError: results.some((result) => result.isError),
                sections: (categories ?? []).map((category, i) => ({
                    category,
                    articles: results[i]?.data?.articles ?? [],
                })),
            }
        },
    })
}