<template>
  <div class="bg-white text-center shadow-md rounded-lg overflow-hidden cursor-pointer">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="alt"
      class="w-full h-48 object-cover bg-gradient-to-r from-blue-300 to-green-300"
    />

    <div v-else class="w-full h-48 bg-gradient-to-r from-blue-300 to-green-300"></div>
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ categoryName }}</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  categoryName: string
  alt: string
  imageUrl?: string
}>()
</script>
<style scoped></style>
