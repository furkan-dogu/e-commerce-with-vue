<template>
    <asyncComponentLoader />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue';

const props = defineProps<{
    componentName: string
}>()

const asyncComponentLoader = ref()

watch(() => props.componentName, (value) => {
    asyncComponentLoader.value = defineAsyncComponent({
        loader: () => import(`./icons/${value}.vue`),
        loadingComponent: () => "component loading..",
        errorComponent: () => "error"
    })
})

</script>
