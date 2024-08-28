<template>
    <a-breadcrumb>
        <a-breadcrumb-item>Sepetim</a-breadcrumb-item>
    </a-breadcrumb>

    <a-divider />

    <a-table :dataSource="cart" :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'amount'">
                <a-input 
                    v-model:value="record.amount" 
                    type="number" 
                    min="1"
                    @change="handleChangeAmount(record.amount, record)" 
                />
            </template>

            <template v-if="column.dataIndex === 'actions'">
                <a-button type="primary" @click="handleRemove(record)">Sil</a-button>
            </template>

            <template v-if="column.key === 'price'">
                {{ record.products.price }} {{ record.products.currency }}
            </template>

            <template v-if="column.key === 'total'">
                {{ record.products.price * record.amount }} {{ record.products.currency }}
            </template>
        </template>
        <template #footer>
            <strong>Toplam: {{ cartSum }} $</strong>
        </template>
    </a-table>
</template>

<script setup lang="ts">
import supabaseClient from '@/plugin/supabaseClient';
import { computed, onMounted, ref } from 'vue';

const cart = ref()

const columns = [
    {
        title: 'Ürün',
        dataIndex: ['products', 'title'],
    },
    {
        title: 'Fiyat',
        key: 'price',
        width: "100px"
    },
    // {
    //     title: 'Fiyat',
    //     dataIndex: ['products', 'price'],
    //     width: "100px"
    // },
    // {
    //     dataIndex: ['products', 'currency'],
    //     width: "100px"
    // },
    {
        title: 'Miktar',
        dataIndex: 'amount',
        width: "100px"
    },
    {
        title: 'Toplam',
        key: 'total',
        width: "100px"
    },
    {
        dataIndex: 'actions',
        width: "100px"
    }
]

const getUserId = async () => {
    const { data: userData } = await supabaseClient.auth.getUser()
    return userData.user?.id
}

const handleRemove = async (cartItem: any) => {
    await supabaseClient
        .from("carts")
        .delete()
        .eq("user_id", await getUserId())
        .eq("id", cartItem.id)

    await loadData()
}

const handleChangeAmount = async (amount: any, cartItem: any) => {
    await supabaseClient
        .from("carts")
        .update({
            amount: amount
        })
        .eq("user_id", await getUserId())
        .eq("id", cartItem.id)

    await loadData()
}

const loadData = async () => {
    const { data } = await supabaseClient
        .from("carts")
        .select("id, amount, products(id, title, price, currency)")
        .eq("user_id", await getUserId())
        .order("id")
    cart.value = data
}

const cartSum = computed(() => {
    return cart.value?.reduce((a: number, item: any) => {
        a += (item.products.price * item.amount)
        return a
    }, 0)
})

onMounted(async () => {
    await loadData()
})

</script>