<template>
  <div class="container mx-auto p-4" v-if="productData">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            class="w-full object-cover md:h-full md:w-48"
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
            <BuyButton :productId="productData.id" label="Buy now" @add-to-cart="addProduct" />
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
import { useRouter } from 'vue-router'
import { storeId, storeToken } from '@/config.ts'
import BuyButton from '@/components/forms/BuyButton.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const cartStore = useCartStore()
const productsStore = useProductsStore()
const productData = productsStore.getProductById(Number(props.id))

if (productData.value === undefined) {
  productsStore.restoreProduct(storeId, storeToken, Number(props.id))
}

const addProduct = () => {
  cartStore.addProduct(Number(props.id))
}

const goBack = () => {
  router.back()
}
</script>

<style scoped></style>
