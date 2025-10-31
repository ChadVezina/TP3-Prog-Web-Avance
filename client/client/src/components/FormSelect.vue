<template>
  <div class="mb-8">
    <label :for="id" class="block mb-2 font-bold text-gray-800">
      {{ label }}
    </label>

    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="selectClass"
      class="w-full p-3 border rounded text-base focus:outline-none focus:ring-2"
    >
      <option value="">-- {{ placeholder }} --</option>
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>

import { computed } from 'vue';
const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, default: '' },
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Sélectionnez une option' },
});

const selectClass = computed(() => {
  return props.modelValue ? 'border-gray-300 focus:ring-blue-500' : 'border-gray-300 focus:ring-blue-500';
});
</script>
