<template>
  <div class="flex flex-col items-center">
    <img src="@/assets/upc.svg" class="w-[400px] h-[100px]" alt="UPC LOGO">
    <form @submit.prevent="emit('submit')" class="flex flex-col justify-center items-center">
      <div>
        <input-login class="w-[324px]" placeholder="Username" v-model="propsValue.username" />
      </div>
      <div>
        <input-login type="email" class="w-[324px] mt-[24px]" placeholder="Email" v-model="propsValue.email" />
      </div>
      <div>
        <input-login class="w-[324px] mt-[24px]" placeholder="Firstname" v-model="propsValue.firstname" />
      </div>
      <div>
        <input-login class="w-[324px] mt-[24px]" placeholder="Lastname" v-model="propsValue.lastname" />
      </div>
      <div>
        <input-login class="w-[324px] mt-[24px]" type="password" placeholder="Password" v-model="propsValue.password"/>
      </div>
      <div>
        <input-login class="w-[324px] mt-[24px]" type="password" placeholder="Confirm Password" v-model="propsValue.confirm_password"/>
      </div>
      <div>
        <login-button class="w-[324px] mt-[24px]">Register</login-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import InputLogin from '@/components/inputs/input-login.vue';
import LoginButton from '@/components/buttons/login-button.vue';
import { useVModel } from '@/composables/useVModel';

const props = defineProps<{modelValue: any}>()
const propsValue = useVModel(props, 'modelValue')
const emit = defineEmits<{
  (e: 'submit'): void,
}>()
</script>
