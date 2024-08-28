<template>
    <h1>Categories</h1>
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

const loadProducts = async () => {
    loading.value = true
    const { data } = await supabaseClient.from("products").select().eq("category_id", route.params.id)
    products.value = data
    loading.value = false
}

watch(
    () => route.params.id, 
    async () => await loadProducts()
)

onMounted(async () => {
    await loadProducts()
})

</script>