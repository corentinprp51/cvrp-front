<template>
  <div class="modal-overlay absolute flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.6)] top-0 left-0 z-50" @click="closeModal">
    <div class="modal bg-white w-1/4 rounded-[8px] p-[15px]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ (e: 'close'): void, }>()

const closeModal = (e: any) => {
  if (e.target) {
    if (e.target.classList.contains('modal-overlay')) {
      emit('close')
    }
  }
}
</script>
