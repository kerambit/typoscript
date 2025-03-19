<template>
  <div class="container mx-auto p-4" v-if="productData">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            class="h-48 w-full object-cover md:h-full md:w-48"
            :src="productData.imageUrl"
            :alt="productData.name"
          />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {{ productData.name }}
          </div>
          <p class="block mt-1 text-lg leading-tight font-medium text-black">
            {{ productData.price }} $
          </p>
          <p class="mt-4 text-gray-500" v-html="productData.description"></p>
          <div class="mt-6">
            <button
              class="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
              :class="{ bounce: isBouncing }"
              @click="addProduct"
            >
              Buy now
            </button>
          </div>
          <div class="mt-6">
            <button
              class="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              @click="goBack"
            >
              Back to categories
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProductsStore } from '@/stores/products.ts'
import { useCartStore } from '@/stores/cart.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeId, storeToken } from '@/config.ts'
import { getProduct } from '@/api/ecwidApi.ts'
import type { ProductData } from '@/api/ecwidApi.types.ts'

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const cartStore = useCartStore()
const productsStore = useProductsStore()
const productData = productsStore.getProductById(Number(props.id))
const isBouncing = ref(false)

if (productData.value === undefined) {
  getProduct(storeId, storeToken, Number(props.id)).then((data: ProductData | undefined) => {
    if (!data) return

    for (const categoryId of data.categoryIds) {
      productsStore.addProduct(categoryId, data)
    }
  })
}

const addProduct = () => {
  isBouncing.value = true
  setTimeout(() => {
    isBouncing.value = false
  }, 500)
  cartStore.addProduct(Number(props.id))
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce {
  animation: bounce 0.5s;
}
</style>
