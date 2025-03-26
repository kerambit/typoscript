<template>
  <header>
    <div class="container mx-auto px-4">
      <nav class="flex justify-center space-x-6">
        <RouterLink to="/" class="text-gray-800 hover:text-blue-500">Categories</RouterLink>
        <RouterLink :to="{ name: 'cart' }" class="text-gray-800 hover:text-blue-500">
          Cart({{ currentCart }})
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="container mx-auto px-4 mt-4">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories.ts'
import { getCategories } from '@/api/ecwidApi.ts'
import { storeId, storeToken } from '@/config.ts'
import { useCartStore } from '@/stores/cart.ts'

const categoriesStore = useCategoriesStore()
const cartStore = useCartStore()
const currentCart = cartStore.getCartSize()

getCategories(storeId, storeToken).then((data) => {
  categoriesStore.setCategories(data.items)
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
