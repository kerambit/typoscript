<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories.ts'
import CategoryInfo from '@/components/CategoryInfo.vue'
import { RouterLink } from 'vue-router'

const categoriesStore = useCategoriesStore()
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <RouterLink
        v-for="[_, category] in categoriesStore.getCategories"
        :to="{ name: 'category', params: { id: category.id } }"
        :key="category.id"
      >
        <CategoryInfo
          :category-name="category.name"
          :alt="category.alt.main"
          :image-url="category.imageUrl"
        />
      </RouterLink>
    </div>
  </div>
</template>
