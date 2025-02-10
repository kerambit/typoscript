<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories.ts'
import { watch } from 'vue'

const props = defineProps<{
  id: string
}>()
const route = useRoute()
const categoriesStore = useCategoriesStore()
let category = categoriesStore.getCategory(Number(props.id))

watch(
  () => route.params.id,
  (newId, _) => {
    category = categoriesStore.getCategory(Number(newId))
  },
)
</script>

<template>
  <div v-if="category !== undefined">
    <h1>Category: {{ route.params.id }}</h1>
    <p>{{ category.name }}</p>
  </div>
</template>

<style scoped></style>
