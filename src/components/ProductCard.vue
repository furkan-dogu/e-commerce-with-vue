<template>
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
        <template #actions v-if="authStore.isAuth">
            <a-button type="primary" @click="handleAddChart(product)">Sepet Ekle</a-button>
        </template>
    </a-card>
</template>

<script setup lang="ts">
import type { IProduct } from '@/models/Product';
import cartService from '@/services/cartService';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore()

defineProps<{
    product: IProduct
}>()

const handleAddChart = async (product: any) => {
    await cartService.addCartItem(authStore.userId, product.id)
    alert("Ürün başarıyla eklendi veya mevcut ürünün miktarı artırıldı")
}

</script>
