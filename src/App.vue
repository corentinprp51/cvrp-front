<template>
  <div>
    <navbar v-if="isMounted === true && route.name !== 'login' && route.name !== 'register'"/>
    <router-view />
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navbar from '@/components/navbar/navbar.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute()
const router = useRouter()
const isMounted = ref(false)
onMounted(async () => {
  await router.isReady();
  isMounted.value = true
})

L.mapquest.key = 'Ar9cZlhyUtoAdJxRkv59u2GzTor4t0Fl';
</script>
