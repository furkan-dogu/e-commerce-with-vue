import type { IProduct } from "@/models/Product"
import supabaseClient from "@/plugin/supabaseClient"

export default {
    async getProducts(categoryId: any) : Promise<IProduct[] | null> {
        const { data } = await supabaseClient
            .from("products")
            .select()
            .eq("category_id", categoryId)
            .returns<IProduct[]>()

        return data
    },
    async getAllProducts() : Promise<IProduct[] | null> {
        const { data } = await supabaseClient
            .from("products")
            .select()
            .returns<IProduct[]>()

        return data
    }
}