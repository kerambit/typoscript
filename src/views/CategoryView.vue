<template>
  <div v-if="category !== undefined">
    <h1 class="text-2xl font-bold mb-4">{{ category.name }}</h1>
    <template v-if="products && products.length > 0">
      <div class="grid grid-cols-1 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white shadow-md rounded-lg overflow-hidden p-4"
        >
          <RouterLink :to="{ name: 'product', params: { id: product.id } }">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-auto object-contain mb-4"
            />
            <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
            <p class="text-lg font-bold mb-4">{{ product.price }} $</p>
          </RouterLink>
          <BuyButton
            :product-id="product.id"
            label="Buy"
            @add-to-cart="() => addToCart(product.id)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories.ts'
import { useProductsStore } from '@/stores/products.ts'
import { searchProducts } from '@/api/ecwidApi.ts'
import { storeId, storeToken } from '@/config.ts'
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart.ts'
import BuyButton from '@/components/forms/BuyButton.vue'

const props = defineProps<{
  id: string
}>()

const categoriesStore = useCategoriesStore()
const cartStore = useCartStore()
const category = categoriesStore.getCategory(Number(props.id))

const productsStore = useProductsStore()
const productsData = ref(productsStore.getProductsByCategoryId(Number(props.id)))
const products = computed(() => productsData.value)

searchProducts(storeId, storeToken, Number(props.id)).then((data) => {
  productsStore.setProducts(Number(props.id), data.items)
})

function addToCart(productId: number) {
  cartStore.addProduct(productId)
}
</script>

<style scoped></style>
