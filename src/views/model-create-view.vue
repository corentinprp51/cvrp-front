<template>
  <div class="mt-[30px] flex flex-col items-center">
    <main-title>CVRP - Resolve a new problem</main-title>
    <form-create-model v-if="!isPreloading" v-model="parameters" v-model:name="name" v-model:email="email" @submit="submitForm"/>
    <div v-if="isPreloading" class="mt-5">
      <loader />
    </div>
    <div v-if="error" class="mt-5 bg-red-200 text-red-900 p-[15px] rounded-[8px]">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import MainTitle from '@/components/titles/main-title.vue';
import { useOptimizeModel } from '@/composables/model/useOptimizeModel';
import FormCreateModel from '@/components/forms/form-create-model.vue';
import { useRouter } from 'vue-router';
import Loader from '@/components/icons/loader.vue';

const parameters = reactive({
  vehicle_max_capacity: 40,
  time_limit: 2,
  iterations_limit: 0,
  gap: 0.1,
})

const name = ref('')
const email = ref(false)
const router = useRouter()


const { optimizeModel, error, solution, id, modelParams, isPreloading } = useOptimizeModel()

const submitForm = async (coords: { xcords: Array<number>; ycords: Array<number>; capacity: Array<number>; }) => {
  if(coords.xcords.length > 0 && coords.ycords.length > 0 && coords.capacity.length > 0) {
    await optimizeModel({ name: name.value, parameters, data: coords, needEmail: email.value })
    await router.push({ name: 'model-view', params: { id: id.value } })
  }
  else {
    error.value = "Le format du fichier n'est pas bon"
  }
}

</script>

