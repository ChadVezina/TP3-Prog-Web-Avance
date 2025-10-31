<template>
  <div class="mb-6">
    <label :for="id" class="block mb-2 font-bold text-gray-800">
      {{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :step="step"
      :min="min"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="inputClass"
      class="w-full p-3 border rounded text-base focus:outline-none focus:ring-2"
    />

    <p v-if="help" class="mt-1 text-sm text-gray-500">{{ help }}</p>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: [String, Number],
  id: { type: String, default: "" },
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  required: { type: Boolean, default: false },
  error: { type: String, default: "" },
  help: { type: String, default: "" },
  step: { type: [String, Number], default: undefined },
  min: { type: [String, Number], default: undefined },
});

const inputClass = computed(() => {
  const base = "border-gray-300";
  const errorClass = props.error
    ? "border-red-600 focus:ring-red-300"
    : "focus:ring-blue-500";
  return `${base} ${errorClass}`;
});
</script>
