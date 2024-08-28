<template>
    <a-breadcrumb v-if="category">
        <a-breadcrumb-item>Kategoriler</a-breadcrumb-item>
        <a-breadcrumb-item>{{ category.title }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-divider />

    <a-skeleton active v-if="loading" />
    <div v-else>
        <a-empty v-if="products.length === 0" description="Bu kategoriye ait ürün bulunamadı." />

        <a-row :gutter="16" v-else>
            <a-col :span="8" v-for="product in products" :key="product.id">
                <a-card hoverable style="width: 240px">
                    <template #cover>
                        <img alt="example" src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ-_JEfZMa8k3LT083NS7k6qd-kroo3EibWeJBv3astq4d71muVcI49RBkWcTVw2D7-QgzgYb5KltllH-ToeZFqLfPl3mVA84W3d06ivpv5JiKCEuBuf-3W2A&usqp=CAE" />
                    </template>
                    <a-card-meta :title="product.title">
                        <template #description>
                            {{ product.price }}
                            {{ product.currency }}
                        </template>
                    </a-card-meta>
                    <template #actions>
                        <a-button type="primary" @click="handleAddChart(product)">Sepet Ekle</a-button>
                    </template>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import supabaseClient from '@/plugin/supabaseClient';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const products = ref()
const loading = ref(true)
const category = ref()

const loadProducts = async () => {
    loading.value = true
    const { data: productsData } = await supabaseClient.from("products").select().eq("category_id", route.params.id)
    const { data: categoryData } = await supabaseClient.from("categories").select().eq("id", route.params.id).single()
    products.value = productsData
    category.value = categoryData
    loading.value = false
}

watch(
    () => route.params.id, 
    async () => await loadProducts()
)

const handleAddChart = async (product: any) => {

    const { data: userData } = await supabaseClient.auth.getUser()

    await supabaseClient.from("carts").insert({
        amount: 1,
        product_id: product.id,
        user_id: userData.user?.id
    })

    alert("Ürün başarıyla eklendi")
}

onMounted(async () => {
    await loadProducts()
})

</script>