import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getCategories, searchProducts } from '@/api/ecwidApi.ts'
import { storeId, storeToken } from '@/config.ts'
import type { CategoryData } from '@/api/ecwidApi.types.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

getCategories(storeId, storeToken).then((data) => {
  data.items.forEach((category: CategoryData) => {
    searchProducts(storeId, storeToken, category.id)
  })
})
