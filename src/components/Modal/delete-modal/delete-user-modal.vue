<template>
 <ModalGenericContent :param="param" @close="emit('close')">
   <template #header>Delete User {{ param }}</template>
   <template #body>Do you want to delete the user {{ param }} ?</template>
   <template #action>
    <button class="bg-red-500 hover:bg-red-600 transition p-[15px] text-white rounded-[8px]" @click="deleteUserModal(param)">Delete User</button>
   </template>
 </ModalGenericContent>
</template>

<script lang="ts" setup>
import ModalGenericContent from '@/components/Modal/modal-generic-content.vue';
import { useDeleteUser } from '@/composables/admin/useDeleteUser';


const props = defineProps<{ param: number }>()
const emit = defineEmits<{ (e: 'close'): void, (e:'confirm'): void }>()
const { deleteUser, errorDeleteUser } = useDeleteUser()

const deleteUserModal = async (userId: number) => {
  await deleteUser(userId)
  emit('confirm')
}
</script>

<style scoped>

</style>
