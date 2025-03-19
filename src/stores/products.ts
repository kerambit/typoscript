import { defineStore } from 'pinia'
import type { ProductData } from '@/api/ecwidApi.types.ts'
import { computed, ref, toRaw } from 'vue'

export const useProductsStore = defineStore('products', () => {
  /**
   * Map<categoryId, Array<ProductData>>
   */
  const products = ref<Map<number, Array<ProductData>>>(new Map())
  /**
   * Map<productId, ProductData>
   */
  const productsInfo = ref<Map<number, ProductData>>(new Map())

  function addProduct(categoryId: number, product: ProductData) {
    const prevState = products.value.get(categoryId)
    productsInfo.value.set(product.id, product)
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

  function getProductById(id: number) {
    return computed(() => productsInfo.value.get(id))
  }

  return { getProductsByCategoryId, addProduct, setProducts, getProductById }
})
