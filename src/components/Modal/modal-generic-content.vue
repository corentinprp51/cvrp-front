<template>
  <div class="modal-header">
    <h1 class="text-[20px]"><slot name="header" /></h1>
    <hr class="mt-[10px]">
  </div>
  <div class="modal-body mt-[20px]">
    <slot name="body" />
  </div>
  <div class="modal-footer mt-[20px]">
    <hr>
    <div class="flex w-full justify-end gap-[15px] mt-[10px]">
      <button class="hover:bg-gray-300 transition bg-gray-200 p-[15px] rounded-[8px]" @click="emit('close')">Cancel</button>
      <slot v-if="param" name="action"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ param: number }>()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<style scoped>

</style>
