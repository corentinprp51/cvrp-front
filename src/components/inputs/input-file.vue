<template>
  <input class="text-[14px] cursor-pointer
         bg-white rounded-[8px]
         text-primary-text-color
         file:mr-2
         file:w-1/3 file:bg-[#D9D9D9]
         file:text-primary-text-color file:py-[10px]
         file:border-none file:rounded-tl-[8px]
         file:cursor-pointer file:rounded-bl-[8px]"
         id="file_input"
         type="file"
         @change="changeFile"
  >
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'changeFile', file: File): void,
}>()

const changeFile = (e: any) => {
  if (e.target.files.length > 0) {
    emit('changeFile', e.target.files[0])
  }
  return
}

</script>
