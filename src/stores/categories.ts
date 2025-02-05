import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CategoryData } from '@/api/ecwidApi.types.ts'
import AsyncIterableArray from '@/utils.ts'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Map<number, CategoryData>>(new Map<number, CategoryData>())

  const getCategories = computed(() => categories.value)

  function addCategory(category: CategoryData) {
    categories.value.set(category.id, category)
  }

  function getCategory(id: number) {
    return computed(() => categories.value.get(id))
  }

  async function setCategories(newCategories: CategoryData[]) {
    const items = new AsyncIterableArray(newCategories)
    for await (const category of items) {
      addCategory(category)
    }

    console.log('Categories:', categories.value)
  }

  return { getCategories, getCategory, addCategory, setCategories }
})
