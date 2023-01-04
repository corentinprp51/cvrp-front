<template>
  <div v-if="isPreloading">
    <loader />
  </div>
  <div v-else class="flex flex-col items-center">
    <div class="flex flex-col items-center mt-[37px]">
      <main-title>Model's List</main-title>
      <login-button class="mt-[30px] w-[300px]" @click="router.push({ name: 'model-new' })">Create Model</login-button>
    </div>
    <list-card class="mt-[25px]" v-if="models.length > 0" :models="models" @update-models="fetchModels" />
  </div>
</template>

<script lang="ts" setup>
import { useListModels } from '@/composables/model/useListModels';
import MainTitle from '@/components/titles/main-title.vue';
import LoginButton from '@/components/buttons/login-button.vue';
import ListCard from '@/components/cards/list-card.vue';
import { useRouter } from 'vue-router';
import Loader from '@/components/icons/loader.vue';

const router = useRouter()
const { models, err, isPreloading, fetchModels } = useListModels()
</script>
