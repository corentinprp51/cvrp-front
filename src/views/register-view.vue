<template>
<!--  <h1>Register</h1>-->
<!--  <form @submit.prevent="registerUser">-->
<!--    <input type="text" placeholder="username" v-model="infos.username">-->
<!--    <input type="text" placeholder="email" v-model="infos.email">-->
<!--    <input type="text" placeholder="firstname" v-model="infos.firstname">-->
<!--    <input type="text" placeholder="lastname" v-model="infos.lastname">-->
<!--    <input type="password" placeholder="Password" v-model="infos.password">-->
<!--    <input type="password" placeholder="confirm password" v-model="confirmPassword">-->
<!--    <button type="submit">Register</button>-->
<!--    {{ err }}-->
<!--  </form>-->
  <div class="register-container">
    <div class="w-full"><img class="h-screen" src="@/assets/login.png" alt=""></div>
    <div class="w-[400px] flex flex-col items-center justify-center">
      <register-form @submit="registerUser" v-model="infos"/>
      {{ err }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRegister } from '@/composables/authentication/useRegister';
import RegisterForm from '@/components/forms/register-form.vue';

const infos = reactive({
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  confirm_password: '',
})

const { register, err } = useRegister()

const registerUser = async () => {
  if (infos.confirm_password === infos.password) {
    await register(infos)
  } else {
    err.value = 'Les mots de passe doivent être identiques'
  }
}
</script>
<style scoped>
.register-container {
  grid-template-columns: calc(100% - 400px) 400px;
  @apply grid
}
</style>
