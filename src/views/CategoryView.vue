<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories.ts'
import { useProductsStore } from '@/stores/products.ts'
import { searchProducts } from '@/api/ecwidApi.ts'
import { storeId, storeToken } from '@/config.ts'

const props = defineProps<{
  id: string
}>()
const route = useRoute()
const categoriesStore = useCategoriesStore()
const category = categoriesStore.getCategory(Number(props.id))

const productsStore = useProductsStore()
let products = productsStore.getProductsByCategoryId(Number(props.id))
console.log(products.value)

if (products.value === undefined) {
  searchProducts(storeId, storeToken, Number(props.id)).then((data) => {
    productsStore.setProducts(Number(props.id), data.items)
    products = productsStore.getProductsByCategoryId(Number(props.id))
    console.log(products.value)
  })
}
</script>

<template>
  <div v-if="category !== undefined">
    <h1>Category: {{ route.params.id }}</h1>
    <p>{{ category.name }}</p>
    <template v-if="products && products.length > 0">
      <p v-for="product in products" :key="product.id">{{ product.name }}</p>
    </template>
  </div>
</template>

<style scoped></style>
