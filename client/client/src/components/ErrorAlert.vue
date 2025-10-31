<template>
  <div v-if="message" class="mb-6 p-4 bg-red-100 text-red-800 rounded">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: '' },
});
</script>
