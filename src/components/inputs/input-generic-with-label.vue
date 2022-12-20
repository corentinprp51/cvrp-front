<template>
  <div class="flex flex-col">
    <label class="text-white text-[14px] font-light italic pb-[5px]">
      {{ label }}
    </label>
    <input-generic v-bind="$attrs" v-model="propsValue" />
  </div>
</template>

<script lang="ts" setup>
import InputGeneric from '@/components/inputs/input-generic.vue';
import { useVModel } from "@/composables/useVModel";

const props = withDefaults(defineProps<{modelValue: any;  label: string}>(), {
})
const propsValue = useVModel(props, 'modelValue')

</script>
