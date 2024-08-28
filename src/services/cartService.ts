import supabaseClient from "@/plugin/supabaseClient"

export default {
    async getCart(userId: string | undefined) {
        return await supabaseClient
            .from("carts")
            .select("id, amount, products(id, title, price, currency)")
            .eq("user_id", userId)
            .order("id")
    },
    async removeCartItem(userId: string | undefined, cartItemId: number) {
        await supabaseClient
            .from("carts")
            .delete()
            .eq("user_id", userId)
            .eq("id", cartItemId)
    },
    async updateAmount(userId: string | undefined, cartItemId: number, amount: number) {
        await supabaseClient
            .from("carts")
            .update({
            amount: amount
            })
            .eq("user_id", userId)
            .eq("id", cartItemId)
    },
    calculateCartItemSum(cartItems: any[]): number {
        if(!cartItems) return 0

        return cartItems.reduce((a: number, item: any) => {
            a += (item.products.price * item.amount)
            return a
        }, 0)
    },
    async addCartItem(userId: string | undefined, productId: number) {
        await supabaseClient.from("carts").insert({
            amount: 1,
            product_id: productId,
            user_id: userId
        })
    }
}