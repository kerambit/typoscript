<template>
  <div class="bg-white text-center shadow-md rounded-lg overflow-hidden cursor-pointer">
    <img
      src=""
      :alt="alt"
      class="w-full h-48 object-cover bg-gradient-to-r from-blue-300 to-green-300"
    />
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ categoryName }}</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  categoryName: string
  alt: string
}>()
</script>
<style scoped></style>
