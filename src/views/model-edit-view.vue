<template>
  <div v-if="isPreloading">
    <loader />
  </div>
  <div v-else-if="model" class="mt-[30px] flex flex-col items-center">
    <div>
      <main-title>Edit - {{ model.name }}</main-title>
    </div>
    <form-edit-model v-model="model.parameters" v-model:name="name" @submit="submitForm"/>
  </div>
</template>

<script lang="ts" setup>
import Loader from '@/components/icons/loader.vue';
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';
import { useViewModel } from '@/composables/model/useViewModel';
import { onMounted, ref } from 'vue';
import MainTitle from '@/components/titles/main-title.vue';
import FormEditModel from '@/components/forms/form-edit-model.vue';
import { useEditModel } from '@/composables/model/useEditModel';

const route: RouteLocationNormalizedLoaded = useRoute()
const router = useRouter()
const modelId: number = parseInt(route.params.id as string)
const { model, fetchModel, isPreloading } = useViewModel(modelId)
const { error, editModel } = useEditModel()
const name = ref('')

onMounted(async () => {
  await fetchModel(modelId)
  if (model.value) {
    name.value = model.value.name
  }
})

const submitForm = async () => {
  if (model.value) {
    await editModel(modelId, {name: name.value, parameters: model.value.parameters})
    await router.push({ name: 'model-view', params: { id : modelId} })
    return
  }
  return
}
</script>
