import supabaseClient from "@/plugin/supabaseClient"

export default {
    async getCategories() {
        return await supabaseClient.from("categories").select()
    },
    async getCategory(id: any) {
        return await supabaseClient
            .from("categories")
            .select()
            .eq("id", id)
            .single()
    }
}