<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories.ts'
import CategoryInfo from '@/components/CategoryInfo.vue'

const categoriesStore = useCategoriesStore()
</script>

<template>
  <main>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CategoryInfo
          v-for="[_, category] in categoriesStore.getCategories"
          :key="category.id"
          :category-name="category.name"
          :alt="category.alt.main"
        />
      </div>
    </div>
  </main>
</template>
