<template>
  <layout />
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { defineAsyncComponent, ref, watch } from 'vue';

  const route = useRoute()
  const layout = ref()

  watch(() => route.meta.layout, (value) => {
    layout.value = defineAsyncComponent(() => import(`@/views/Layouts/${value}.vue`))
  })
</script>
