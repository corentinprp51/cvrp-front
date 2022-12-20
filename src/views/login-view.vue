<template>
  <div class="login-container">
    <div class="w-full"><img class="h-screen" src="@/assets/login.png" alt=""></div>
    <div class="w-[400px] flex flex-col items-center justify-center">
      <login-form @submit="loginUser" v-model="infos"/>
      {{ err }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useLogin } from '@/composables/authentication/useLogin';
import LoginForm from '@/components/forms/login-form.vue';

const infos = reactive({
  username: '',
  password: '',
})

const { login, err } = useLogin()

const loginUser = async () => {
  await login(infos)
}
</script>
<style scoped>
.login-container {
  grid-template-columns: calc(100% - 400px) 400px;
  @apply grid
}
</style>
