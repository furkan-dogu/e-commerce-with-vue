<template>
    <a-breadcrumb v-if="category">
        <a-breadcrumb-item>Kategoriler</a-breadcrumb-item>
        <a-breadcrumb-item>{{ category.title }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-divider />

    <a-skeleton active v-if="loading" />
    <div v-else>
        <a-empty v-if="products?.length === 0" description="Bu kategoriye ait ürün bulunamadı." />

        <a-row :gutter="16" v-else>
            <a-col
                v-for="product in products"
                :key="product.id"
                :xs="24"  
                :sm="12"   
                :xl="8"   
            >
                <product-card :product="product" />
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/models/Product';
import categoryService from '@/services/categoryService';
import productService from '@/services/productService';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';

const route = useRoute()
const products = ref<IProduct[] | null>()
const loading = ref(true)
const category = ref()

const loadProducts = async () => {
    loading.value = true

    const categoryId = route.params.id

    const productsData = await productService.getProducts(categoryId)
    const { data: categoryData } = await categoryService.getCategory(categoryId)

    products.value = productsData
    category.value = categoryData
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
