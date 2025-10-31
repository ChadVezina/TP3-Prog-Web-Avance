<template>
  <div class="mb-6">
    <label :for="id" class="block mb-2 font-bold text-gray-800">
      {{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>

    <textarea
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="textareaClass"
      class="w-full p-3 border rounded text-base resize-y focus:outline-none focus:ring-2"
    ></textarea>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: [String, Number], default: 4 },
  required: { type: Boolean, default: false },
  error: { type: String, default: '' },
});

const textareaClass = computed(() => {
  const base = 'border-gray-300';
  const errorClass = props.error ? 'border-red-600 focus:ring-red-300' : 'focus:ring-blue-500';
  return `${base} ${errorClass}`;
});
</script>
