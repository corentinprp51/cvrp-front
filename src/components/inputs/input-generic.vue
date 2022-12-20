<template>
  <input v-bind="$attrs"
         class="bg-white drop-shadow-classic text-primary-text-color py-[9px] text-[16px] text-center rounded-[8px]"
         type="number"
         v-model="propsValue"
         step="any">
</template>

<script lang="ts" setup>
import { useVModel } from "@/composables/useVModel";
const props = withDefaults(defineProps<{modelValue: any}>(), {
})
const propsValue = useVModel(props, 'modelValue')
</script>
