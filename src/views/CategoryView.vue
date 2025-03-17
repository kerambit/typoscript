<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories.ts'
import { useProductsStore } from '@/stores/products.ts'
import { searchProducts } from '@/api/ecwidApi.ts'
import { storeId, storeToken } from '@/config.ts'
import { reactive } from 'vue'
import { useCartStore } from '@/stores/cart.ts'

const props = defineProps<{
  id: string
}>()

const categoriesStore = useCategoriesStore()
const cartStore = useCartStore()
const category = categoriesStore.getCategory(Number(props.id))

const productsStore = useProductsStore()
let products = productsStore.getProductsByCategoryId(Number(props.id))

if (products.value === undefined) {
  searchProducts(storeId, storeToken, Number(props.id)).then((data) => {
    productsStore.setProducts(Number(props.id), data.items)
    products = productsStore.getProductsByCategoryId(Number(props.id))
  })
}

const animateButtons = reactive<{ [key: number]: boolean }>({})

function addToCart(productId: number) {
  animateButtons[productId] = true
  cartStore.addProduct(productId)
  setTimeout(() => {
    animateButtons[productId] = false
  }, 500)
}
</script>

<template>
  <div v-if="category !== undefined">
    <h1 class="text-2xl font-bold mb-4">{{ category.name }}</h1>
    <template v-if="products && products.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white shadow-md rounded-lg overflow-hidden p-4"
        >
          <RouterLink :to="{ name: 'product', params: { id: product.id } }">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-48 object-cover mb-4"
            />
            <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
            <p class="text-lg font-bold mb-4">{{ product.price }} $</p>
          </RouterLink>
          <button
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            :class="{ bounce: animateButtons[product.id] }"
            @click="addToCart(product.id)"
          >
            Buy
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

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
