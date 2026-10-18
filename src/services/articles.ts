import { supabase } from "../lib/supabase"
import type { Article, ArticleDetails, ArticlePayload } from "../types/article"

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


export const getArticle = async (id: number) => {
    const { data, error } = await supabase
        .from("articles")
        .select("id, title, description, thumbnail, content, created_at, category:categories(id, title), author:profiles(display_name),author_id")
        .eq("id", id).maybeSingle()
    if (error) throw error
    return data as unknown as ArticleDetails | null
}




export const getRelatedArticles = async (categoryId: number, articleId: number) => {

    const { data, error } = await supabase
        .from('articles')
        .select("id, title, description, thumbnail, created_at, category:categories(id, title), author:profiles(display_name)")
        .order("created_at", { ascending: false })
        .eq('category_id', categoryId)
        .neq('id', articleId)
        .limit(3)
    if (error) throw error
    return data as unknown as Article[]

}


export const createArticle = async (author_id: string, article: ArticlePayload) => {
    const { data, error } = await supabase
        .from("articles")
        .insert({ ...article, author_id }).select("id").single()
    if (error) throw error
    return data
}

export const updateArticle = async (id: number, article: ArticlePayload) => {
    const { data, error } = await supabase
        .from("articles")
        .update(article).eq("id", id).select("id").single()
    if (error) throw error
    return data
}

export const deleteArticle = async (id: number) => {
    const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id)
    if (error) throw error
}

export const getUserArticles = async (userId: string) => {
    const { data, error } = await supabase
        .from("articles")
        .select("id, title, description, thumbnail, created_at, category:categories(id, title),author:profiles(display_name)")
        .eq("author_id", userId).order("created_at", { ascending: false })
    if (error) throw error
    return data as unknown as Article[]
}