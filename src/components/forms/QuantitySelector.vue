<template>
  <div class="flex items-center">
    <label for="quantity" class="mr-2 text-gray-600">Quantity:</label>
    <select :value="quantity" @change="onQuantityChange" class="border border-gray-300 rounded p-1">
      <option v-for="n in getQuantityOptions(quantity)" :key="n" :value="n">
        {{ n }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Emits {
  (event: 'on-update-qty', value: number): void
}

const props = withDefaults(
  defineProps<{
    quantity: number
    step?: number
  }>(),
  {
    step: 5,
  },
)

const emits = defineEmits<Emits>()

const getQuantityOptions = (currentQuantity: number) => {
  const minQuantity = Math.max(1, currentQuantity - props.step)
  const maxQuantity = currentQuantity + props.step
  const options = []
  for (let i = minQuantity; i <= maxQuantity; i++) {
    options.push(i)
  }
  return options
}

const onQuantityChange = (event: Event) => {
  if (!(event.target instanceof HTMLSelectElement)) return
  emits('on-update-qty', Number(event.target.value))
}
</script>
