<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Ana Sayfa</a-breadcrumb-item>
  </a-breadcrumb>

  <a-divider />

  <a-skeleton active v-if="loading" />
  <div v-else>
    <a-empty v-if="products.length === 0" description="Ürün bulunamadı." />

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
import ProductCard from '@/components/ProductCard.vue'
import productService from '@/services/productService'
import { onMounted, ref } from 'vue'

const products = ref()
const loading = ref(true)

onMounted(async () => {
  const productsData = await productService.getAllProducts()
  products.value = productsData
  loading.value = false
})
</script>
