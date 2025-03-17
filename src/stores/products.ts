import { defineStore } from 'pinia'
import type { ProductData } from '@/api/ecwidApi.types.ts'
import { computed, ref, toRaw } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Map<number, Array<ProductData>>>(new Map())

  function addProduct(categoryId: number, product: ProductData) {
    const prevState = products.value.get(categoryId)
    if (!prevState) {
      products.value.set(categoryId, [product])
      return
    }

    const newState = toRaw(prevState)
    newState.push(product)
    products.value.set(categoryId, newState)
  }

  function getProductsByCategoryId(id: number) {
    return computed(() => products.value.get(id))
  }

  function setProducts(categoryId: number, newProducts: ProductData[]) {
    for (const product of newProducts) {
      addProduct(categoryId, product)
    }

    console.log(`Products for category ${categoryId}: `, products.value)
  }

  return { getProductsByCategoryId, addProduct, setProducts }
})
