<template>
  <div v-if="isPreloading">
    <loader />
  </div>
  <div v-else-if="user && !isPreloading" class="flex flex-col items-center">
    <div class="flex flex-col items-center mt-[37px]">
      <main-title>Model's List - {{ user.username }}</main-title>
    </div>
    <list-card class="mt-[25px]" v-if="userId && user.models.length > 0" :models="user.models" @update-models="userId ? fetchUser(userId) : null"/>
  </div>
</template>

<script lang="ts" setup>
import MainTitle from '@/components/titles/main-title.vue';
import ListCard from '@/components/cards/list-card.vue';
import Loader from '@/components/icons/loader.vue';
import { useGetUser } from '@/composables/admin/useGetUser';
import { onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const userId: Ref<number | null> = ref(null)
const { fetchUser, err, isPreloading, user } = useGetUser()

onMounted(async () => {
  if (route.params.id){
    userId.value = parseInt(route.params.id as string)
    await fetchUser(userId.value)
  }
})
</script>
