<template>
  <div>
    <flashmessage-handler />
    <modal-wrapper />
    <div>
      <navbar v-if="isMounted === true && route.name !== 'login' && route.name !== 'register'"/>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navbar from '@/components/navbar/navbar.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import FlashmessageHandler from '@/components/flash-messages/flashmessage-handler.vue';
import ModalWrapper from '@/components/Modal/modal-wrapper.vue';

const route = useRoute()
const router = useRouter()
const isMounted = ref(false)
onMounted(async () => {
  await router.isReady();
  isMounted.value = true
})
// @ts-ignore
L.mapquest.key = 'Ar9cZlhyUtoAdJxRkv59u2GzTor4t0Fl';
</script>
