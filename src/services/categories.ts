import { supabase } from "../lib/supabase"
import type { Category } from "../types/category"

export const getCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase.from("categories").select("id, title")
    if (error) throw error
    return data
}