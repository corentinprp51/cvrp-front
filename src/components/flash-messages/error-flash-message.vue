<template>
  <div v-if="message" class="bg-red-200 text-red-800 absolute right-[5px] p-[20px] text-[20px] rounded-[10px]">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>

defineProps<{ message: string }>()
</script>
