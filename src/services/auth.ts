import { supabase } from "../lib/supabase"

export const register = async ({ email, password, username, display_name }: { email: string, password: string, username: string, display_name: string }) => {
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username, display_name } },
    })
    if (error) throw error
}

export const login = async ({ email, password }: { email: string, password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
}

export const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}