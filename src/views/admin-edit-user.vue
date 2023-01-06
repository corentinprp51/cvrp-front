<template>
  <div class="mt-[30px] flex flex-col items-center" v-if="!isPreloading && userToEditForm">
    <div>
      <main-title>Edit User | {{ userId }}</main-title>
    </div>
    <form-admin-edit-user @submit="editUserForm" v-model="userToEditForm"/>
    <div v-if="errEdit" class="mt-[10px] text-red-800 bg-red-200 text-center rounded-[8px] p-[8px]">{{ errEdit }}</div>
  </div>
  <div v-if="isPreloading || isPreloadingEdit">
    <loader />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, Ref, ref } from 'vue';
import { useGetUser } from '@/composables/admin/useGetUser';
import Loader from '@/components/icons/loader.vue';
import MainTitle from '@/components/titles/main-title.vue';
import { User } from '@/types/User';
import FormAdminEditUser from '@/components/forms/form-admin-edit-user.vue';
import { useEditUserAdmin } from '@/composables/admin/useEditUserAdmin';

const route = useRoute()
const userId: Ref<number | null> = ref(null)
const userToEditForm: Ref<User & {password: string; confirm_password: string} | null> = ref(null)
const { fetchUser, err, isPreloading, user } = useGetUser()
const { errEdit, isPreloadingEdit, editUser } = useEditUserAdmin()
onMounted(async () => {
  if (route.params.id){
    userId.value = parseInt(route.params.id as string)
    await fetchUser(userId.value)
    userToEditForm.value = {
      ...user.value as User,
      password: '',
      confirm_password: '',
    }
  }
})
const editUserForm = async () => {
  if (userToEditForm.value) {
    if (userToEditForm.value.password === userToEditForm.value.confirm_password) {
      await editUser(userId.value as number, userToEditForm.value)
    }
    else {
      errEdit.value = "Les mots de passe doivent être identiques"
    }
  }
}
</script>
