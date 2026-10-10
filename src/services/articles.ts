import { supabase } from "../lib/supabase"
import type { Article } from "../types/article"

export interface GetArticlesParams {

    page?: number
    limit?: number
    categoryId?: number | null
}

export const getArticles = async (params?: GetArticlesParams) => {
    const { page = 1, limit = 6, categoryId } = params || {}
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase
        .from("articles")
        .select("id, title, description, thumbnail, created_at, category:categories(id, title), author:profiles(display_name)", {
            count: "exact"
        })
        .order("created_at", { ascending: false })
        .range(from, to)

    if (categoryId) {
        query = query.eq("category_id", categoryId)
    }

    const { data, count, error } = await query
    if (error) throw error
    return { articles: data as unknown as Article[], total: count ?? 0 }
}