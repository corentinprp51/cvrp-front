<template>
  <form @submit.prevent="emit('submit')" class="bg-primary-color mt-[25px] rounded-[8px] drop-shadow-classic flex flex-col items-center justify-center py-[15px] w-2/4">
    <div>
      <input-generic-with-label class="w-[300px]" type="text" v-model="propsName" label="Model Name" />
    </div>
    <div class="mt-[20px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.vehicle_max_capacity" label="Vehicle Max Capacity" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.time_limit" label="Time Limit" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.iterations_limit" label="Iterations Limit" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.gap" label="MIP Gap" />
    </div>
    <div class="mt-[20px] flex items-center">
      <span class="text-white font-bold mr-5">Need Email Notification</span><input type="checkbox" v-model="propsEmail">
    </div>
    <button-generic class="w-[300px] mt-[20px]">Edit</button-generic>
  </form>
</template>

<script lang="ts" setup>
import { useVModel } from "@/composables/useVModel";
import InputGenericWithLabel from '@/components/inputs/input-generic-with-label.vue';
import ButtonGeneric from '@/components/buttons/button-generic.vue';

const props = withDefaults(defineProps<{modelValue: any; name: string; email: boolean}>(), {
})
const propsValue = useVModel(props, 'modelValue')
const propsName = useVModel(props, 'name')
const propsEmail = useVModel(props, 'email')
const emit = defineEmits<{
  (e: 'submit'): void,
  (e: 'update:name'): void,
  (e: 'update:email'): void
}>()
</script>
