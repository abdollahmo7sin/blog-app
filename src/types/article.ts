import type { Category } from "./category";

export type Article = {
    id: number
    title: string
    description: string
    thumbnail: string
    created_at: string
    category: Category
    author: { display_name: string }
}

export type ArticleDetails = Article & {
    content: string,
    author_id: string
}

export type ArticlePayload = {
    title: string
    description: string
    content: string
    category_id: number
    thumbnail: string
}