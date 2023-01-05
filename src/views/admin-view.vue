<template>
  <div class="mt-[30px]">
    <main-title>Admin</main-title>
    <div class="flex grid grid-cols-2 mt-[20px]">
      <div class="flex flex-col items-center">
        <second-title>Users List</second-title>
        <ul v-if="!isPreloadingUsers" class="mt-[10px] w-[60%] shadow rounded-[8px]">
          <li v-for="(user, index) in users" :class="index % 2 === 0 ? 'bg-[#EFEFEF]' : 'bg-white'" class="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center rounded-[8px] py-[15px] px-[8px] text-[18px] text-start">
            <span>{{ user.id }}</span>
            <span>{{ user.username }}</span>
            <span class="font-bold">{{ user.isAdmin ? 'admin' : 'member' }}</span>
            <span class="justify-self-end"><edit class="w-[25px] h-[25px] cursor-pointer" @click="router.push({name: 'admin-edit-user', params:{id: user.id}})" /></span>
            <span class="justify-self-end"><trash class="w-[25px] h-[25px] cursor-pointer" @click="deleteUserFromList(user.id)" /></span>
          </li>
        </ul>
        <div v-else>
          <loader />
        </div>
      </div>
      <div class="flex flex-col items-center">
        <second-title>Admin List</second-title>
        <ul v-if="!isPreloadingAdmin" class="mt-[10px] w-[60%] shadow rounded-[8px]">
          <li v-for="(admin, index) in admins" :class="index % 2 === 0 ? 'bg-[#EFEFEF]' : 'bg-white'" class="grid grid-cols-[1fr_2fr_1fr] items-center rounded-[8px] py-[15px] px-[8px] text-[18px] text-start">
            <span>{{ admin.id }}</span>
            <span>{{ admin.username }}</span>
            <span class="font-bold">{{ admin.isAdmin ? 'admin' : 'member' }}</span>
          </li>
        </ul>
        <div class="mt-[30px] flex flex-col items-center" v-if="!isPreloadingAdmin">
          <second-title>Set an Admin</second-title>
          <form @submit.prevent="setUserAdmin" class="mt-[10px]">
            <input-generic type="text" class="w-[100px]" v-model="userId" />
            <button-generic-reversed class="ml-[5px] px-[5px]" type="submit">Add</button-generic-reversed>
            <div v-if="errorSetAdmin" class="mt-[10px] text-red-800 bg-red-200 text-center rounded-[8px] p-[8px]">{{ errorSetAdmin }}</div>
          </form>
        </div>
        <div v-else>
          <loader />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainTitle from '@/components/titles/main-title.vue';
import SecondTitle from '@/components/titles/second-title.vue';
import { useListUsers } from '@/composables/admin/useListUsers';
import { useListAdmins } from '@/composables/admin/useListAdmins';
import { ref } from 'vue';
import InputGeneric from '@/components/inputs/input-generic.vue';
import ButtonGenericReversed from '@/components/buttons/button-generic-reversed.vue';
import Loader from '@/components/icons/loader.vue';
import { useSetAdmin } from '@/composables/admin/useSetAdmin';
import Trash from '@/components/icons/trash.vue';
import { useDeleteUser } from '@/composables/admin/useDeleteUser';
import ModalServices from '@/services/ModalServices';
import DeleteUserModal from '@/components/Modal/delete-modal/delete-user-modal.vue'
import Edit from '@/components/icons/edit.vue';
import { useRouter } from 'vue-router';

const userId = ref('')
const { users, isPreloadingUsers, errUsers, fetchUsers } = useListUsers()
const { admins, isPreloadingAdmin, errAdmin, fetchAdmins } = useListAdmins()
const { setAdmin, errorSetAdmin } = useSetAdmin()
const { deleteUser, errorDeleteUser } = useDeleteUser()
const router = useRouter()
fetchUsers()
fetchAdmins()

const setUserAdmin = async () => {
  await setAdmin(parseInt(userId.value))
    .then(async () => await fetchAdmins())
}

const deleteUserFromList = async (userId: number) => {
  if (userId) {
    ModalServices.getInstance().openDeleteModal(DeleteUserModal, userId).then((isDeleted: boolean) => {
      if (isDeleted) {
        fetchUsers()
        fetchAdmins()
      }
    })
  }
  return
}
</script>
