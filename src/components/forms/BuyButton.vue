<template>
  <button
    :class="['bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600', { bounce: isBouncing }]"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  productId: number
  label: string
}>()

const emit = defineEmits<{
  (event: 'add-to-cart', productId: number): void
}>()

const isBouncing = ref(false)

const handleClick = () => {
  isBouncing.value = true
  emit('add-to-cart', props.productId)
  setTimeout(() => {
    isBouncing.value = false
  }, 500)
}
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce {
  animation: bounce 0.5s;
}
</style>
