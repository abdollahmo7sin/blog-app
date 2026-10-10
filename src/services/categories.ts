import type { Category } from "../types/category"
import { supabase } from "../lib/supabase"

export const getCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase.from("categories").select("id, title")
    if (error) throw error
    return data
}