<template>
  <ModalGenericContent :param="param" @close="emit('close')">
    <template #header>Delete Model {{ param }}</template>
    <template #body>Do you want to delete the model {{ param }} ?</template>
    <template #action>
      <button class="bg-red-500 hover:bg-red-600 transition p-[15px] text-white rounded-[8px]" @click="deleteUserModel(param)">Delete Model</button>
    </template>
  </ModalGenericContent>
</template>

<script lang="ts" setup>
import ModalGenericContent from '@/components/Modal/modal-generic-content.vue';
import { useDeleteModel } from '@/composables/model/useDeleteModel';


const props = defineProps<{ param: number }>()
const emit = defineEmits<{ (e: 'close'): void, (e:'confirm'): void }>()
const { deleteModel, err } = useDeleteModel()

const deleteUserModel = async (modelId: number) => {
  await deleteModel(modelId)
  emit('confirm')
}
</script>

<style scoped>

</style>
