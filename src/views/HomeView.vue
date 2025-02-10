<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories.ts'
import CategoryInfo from '@/components/CategoryInfo.vue'
import { RouterLink } from 'vue-router'

const categoriesStore = useCategoriesStore()
</script>

<template>
  <main>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RouterLink
          :to="{ name: 'category', params: { id: category.id } }"
          v-for="[_, category] in categoriesStore.getCategories"
          :key="category.id"
        >
          <CategoryInfo :category-name="category.name" :alt="category.alt.main" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>
