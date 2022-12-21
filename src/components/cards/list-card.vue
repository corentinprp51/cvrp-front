<template>
  <div class="w-3/4 rounded-[20px] bg-white shadow">
    <div class="header rounded-t-[20px] w-full bg-[#EFEFEF] grid py-[30px] pl-[79px] grid-cols-[50%_1fr_1fr_1fr]">
      <span>Name</span>
      <span>Creation Date</span>
      <span>Last Edit</span>
      <span>Actions</span>
    </div>
    <div class="content w-full max-h-[500px] overflow-y-auto">
      <div v-for="model in models" class="grid grid-cols-[50%_1fr_1fr_1fr] pl-[79px] items-center py-[9px] shadow mb-[5px] last:mb-0">
        <span>
          <router-link class="text-[#3D8CC5] hover:underline hover:decoration-1" :to="{ name: 'model-view', params: { id: model.id } }">{{ model.name }}</router-link>
        </span>
        <span>{{ castDate(model.creation_date) }}</span>
        <span>{{ model.last_edit ? model.last_edit : '-'}}</span>
        <span class="flex gap-[10px]">
          <edit class="cursor-pointer w-[30px] h-[30px]" @click="editModel(model.id)" />
          <trash class="cursor-pointer w-[30px] h-[30px]" @click="deleteM(model.id)"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Model } from '@/types/Model';
import { castDate } from '@/utils/castDate';
import Trash from '@/components/icons/trash.vue';
import Edit from '@/components/icons/edit.vue';
import { useRouter } from 'vue-router';
import { useDeleteModel } from '@/composables/model/useDeleteModel';

const props = defineProps<{models: Array<Model>}>()
const router = useRouter()
const { err, deleteModel } = useDeleteModel()

const deleteM = async (modelId: number) => {
  await deleteModel(modelId)
}

const editModel = (modelId: number) => {
  router.push({ name: 'model-edit', params: { id: modelId } })
}

</script>
