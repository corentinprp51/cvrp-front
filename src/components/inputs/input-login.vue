<template>
  <input v-bind="$attrs"
         class="bg-white drop-shadow-classic border-2 border-primary-color py-[17px] px-[10px] text-primary-text-color py-[9px] text-[16px] rounded-[60px] outline-none focus:border-blue-900"
         v-model="propsValue">
</template>

<script lang="ts" setup>
import { useVModel } from "@/composables/useVModel";
const props = withDefaults(defineProps<{modelValue: any}>(), {
})
const propsValue = useVModel(props, 'modelValue')
</script>

<style scoped>
::-webkit-input-placeholder {
  font-style: italic;
}
:-moz-placeholder {
  font-style: italic;
}
::-moz-placeholder {
  font-style: italic;
}
:-ms-input-placeholder {
  font-style: italic;
}
</style>
