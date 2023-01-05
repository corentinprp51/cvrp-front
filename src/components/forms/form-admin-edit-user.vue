<template>
  <form @submit.prevent="emit('submit')" class="bg-primary-color mt-[25px] rounded-[8px] drop-shadow-classic flex flex-col items-center justify-center py-[15px] w-2/4">
    <div>
      <input-generic-with-label class="w-[300px]" type="text" v-model="propsValue.username" label="Username" />
    </div>
    <div class="mt-[20px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.email" type="email" label="Email" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" type="text" v-model="propsValue.firstname" label="Firstname" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" type="text" v-model="propsValue.lastname" label="Lastname" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" type="password" v-model="propsValue.password" label="New Password" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" type="password" v-model="propsValue.confirm_password" label="Confirm new Password" />
    </div>
    <button-generic class="w-[300px] mt-[20px]">Edit User</button-generic>
  </form>
</template>

<script lang="ts" setup>
import { useVModel } from "@/composables/useVModel";
import InputGenericWithLabel from '@/components/inputs/input-generic-with-label.vue';
import ButtonGeneric from '@/components/buttons/button-generic.vue';
import { User } from '@/types/User';

const props = withDefaults(defineProps<{modelValue: User & {password: string; confirm_password: string};}>(), {
})
const propsValue = useVModel(props, 'modelValue')
const emit = defineEmits<{
  (e: 'submit'): void,
}>()
</script>
