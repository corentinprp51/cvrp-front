<template>
  <div class="h-[85px] grid grid-cols-3 items-center bg-white drop-shadow-classic">
    <router-link to="/"><img src="@/assets/upc.svg" alt="" class="cursor-pointer"></router-link>
    <ul class="list flex justify-center m-0 p-0 text-primary-color">
      <router-link class="menu-item" to="/">
        <li>Home</li>
      </router-link>
      <router-link class="menu-item" to="/profile">
        <li>Profile</li>
      </router-link>
      <router-link class="menu-item" to="/admin" v-if="userStore.user && userStore.user.isAdmin">
        <li>Admin</li>
      </router-link>
    </ul>
    <div class="logout flex justify-end">
      <logout class="cursor-pointer w-[35px] h-[35px] mr-[10px]" @click="userStore.logout()"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logout from '@/components/icons/logout.vue';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore()

</script>

<style scoped>
.menu-item {
  @apply mr-[57px] hover:text-blue-900 transition;
}
.menu-item:last-child {
  @apply mr-0;
}
.list .router-link-active {
  @apply border-b-primary-color border-b-2 pb-2
}
</style>
