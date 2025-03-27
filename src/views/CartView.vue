<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
    <template v-if="products.length > 0">
      <ul class="mb-4">
        <li
          v-for="product in products"
          :key="product.id"
          class="flex justify-between items-center mb-2"
        >
          <div class="flex items-center">
            <img :src="product.imageUrl" :alt="product.name" class="w-16 h-16 object-contain" />
            <div class="ml-2">
              <h3 class="text-lg font-semibold">{{ product.name }}</h3>
              <p class="text-gray-600">{{ product.price }} $</p>
              <div class="flex items-center">
                <label for="quantity" class="mr-2 text-gray-600">Quantity:</label>
                <select
                  :value="cartItems.get(product.id)"
                  @change="(event) => updateQuantity(product.id, event)"
                  class="border border-gray-300 rounded p-1"
                >
                  <option
                    v-for="n in getQuantityOptions(cartItems.get(product.id) || 1)"
                    :key="n"
                    :value="n"
                  >
                    {{ n }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button
            class="text-red-500 hover:text-red-700 cursor-pointer"
            @click="removeFromCart(product.id)"
          >
            &times;
          </button>
        </li>
      </ul>
      <div class="flex justify-between">
        <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" @click="clearCart">
          Clear Cart
        </button>
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          @click="placeOrder"
        >
          Place Order
        </button>
      </div>
    </template>
    <div v-if="!isOrderPlaced && products.length === 0" class="text-gray-600 mb-4 text-lg">
      Your cart is empty.
    </div>
    <div v-if="isOrderPlaced" class="text-gray-800 mb-4 text-lg">Order placed 🥳</div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'
import { useProductsStore } from '@/stores/products.ts'
import { ref, toRaw } from 'vue'
import type { ProductData } from '@/api/ecwidApi.types.ts'
import { storeId, storeToken } from '@/config.ts'

const cartStore = useCartStore()
const productsStore = useProductsStore()
const cartItems = cartStore.getCart()
const products = ref<Array<ProductData>>([])
const isOrderPlaced = ref(false)

if (cartItems.value.size > 0) {
  const data = Array<ProductData>()
  for (const [id, _] of cartItems.value) {
    const product = productsStore.getProductById(id)
    if (!product.value) {
      productsStore
        .restoreProduct(storeId, storeToken, id)
        .then((productData: ProductData | undefined) => {
          if (!productData) return

          products.value.push(productData)
        })

      continue
    }

    data.push(toRaw(product.value))
  }

  products.value = data
}

const removeFromCart = (id: number) => {
  cartStore.removeProduct(id)
  products.value = products.value.filter((product) => product.id !== id)
}

const clearCart = () => {
  cartStore.clearCart()
  products.value = []
}

const placeOrder = () => {
  clearCart()
  isOrderPlaced.value = true
}

const updateQuantity = (productId: number, event: Event) => {
  if (!(event.target instanceof HTMLSelectElement)) return
  cartStore.updateProductQuantity(productId, Number(event.target.value))
}

const getQuantityOptions = (currentQuantity: number) => {
  const minQuantity = Math.max(1, currentQuantity - 5)
  const maxQuantity = currentQuantity + 5
  const options = []
  for (let i = minQuantity; i <= maxQuantity; i++) {
    options.push(i)
  }
  return options
}
</script>
