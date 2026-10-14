import { supabase } from "../lib/supabase";

export const uploadThumbnail = async (file: File, userId: string) => {
    const ext = file.name.split(".").pop() || "png"
    const path = `${userId}/${crypto.randomUUID()}.${ext}`
    const { error } = await supabase.storage
        .from("thumbnails")
        .upload(path, file)
    if (error) throw error

    return supabase.storage.from("thumbnails").getPublicUrl(path).data.publicUrl

}

