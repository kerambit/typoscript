import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Map<number, number>>(new Map())
  const storageKey = 'cart'

  const savedCart = sessionStorage.getItem(storageKey)
  if (savedCart) {
    cart.value = new Map(JSON.parse(savedCart))
  }

  function addProduct(productId: number) {
    const prevState = cart.value.get(productId)
    if (!prevState) {
      cart.value.set(productId, 1)
      return
    }

    const newState = prevState + 1
    cart.value.set(productId, newState)
  }

  function removeProduct(productId: number) {
    if (!cart.value.has(productId)) {
      return
    }

    cart.value.delete(productId)
  }

  function getCart() {
    return computed(() => cart.value)
  }

  function clearCart() {
    cart.value = new Map()
  }

  function getCartSize() {
    return computed(() => Array.from(cart.value.values()).reduce((acc, curr) => acc + curr, 0))
  }

  function updateProductQuantity(productId: number, quantity: number) {
    cart.value.set(productId, quantity)
  }

  watch(
    cart,
    (newCart) => {
      sessionStorage.setItem(storageKey, JSON.stringify(Array.from(newCart.entries())))
    },
    { deep: true },
  )

  return { addProduct, removeProduct, getCart, clearCart, getCartSize, updateProductQuantity }
})
