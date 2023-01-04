<template>
  <div class="mt-[30px]">
    <main-title>User Profile</main-title>
    <div class="w-full flex flex-col items-center justify-center mt-[30px]" v-if="!isPreloading">
      <div class="w-1/2 shadow rounded-[8px] flex flex-col">
        <div class="w-full grid grid-cols-2 gap-[30px] py-[15px] bg-[#EFEFEF] rounded-t-[8px]">
          <span class="font-semibold justify-self-end">Username</span>
          <span>{{ userStore.user.username }}</span>
        </div>
        <div class="w-full grid grid-cols-2 gap-[30px] py-[15px]">
          <span class="font-semibold justify-self-end">Email</span>
          <span>{{ userStore.user.email }}</span>
        </div>
        <div class="w-full grid grid-cols-2 justify-center gap-[30px] py-[15px] bg-[#EFEFEF] items-center">
          <span class="font-semibold justify-self-end">Firstname</span>
          <input-generic v-if="isEditMode" type="text" v-model="userToEdit.firstname" class="pl-[5px] text-start"/>
          <span v-else>{{ userStore.user.firstname }}</span>
        </div>
        <div class="w-full grid grid-cols-2 gap-[30px] py-[15px] items-center">
          <span class="font-semibold justify-self-end">Lastname</span>
          <input-generic v-if="isEditMode" type="text" v-model="userToEdit.lastname" class="pl-[5px] text-start"/>
          <span v-else>{{ userStore.user.lastname }}</span>
        </div>
        <div class="w-full grid grid-cols-2 gap-[30px] py-[15px] items-center bg-[#EFEFEF]" v-if="isEditMode">
          <span class="font-semibold justify-self-end">New Password</span>
          <input-generic type="password" v-model="userToEdit.password" class="pl-[5px] text-start"/>
        </div>
        <div class="w-full grid grid-cols-2 gap-[30px] py-[15px] items-center" v-if="isEditMode">
          <span class="font-semibold justify-self-end">Confirm New Password</span>
          <input-generic type="password" v-model="userToEdit.confirm_password" class="pl-[5px] text-start"/>
        </div>
        <button-generic-reversed v-if="!isEditMode" class="mt-[20px]" @click="isEditMode = true">Edit Profile</button-generic-reversed>
      </div>
      <div class="w-full flex justify-center gap-[20px] mt-[20px]" v-if="isEditMode">
        <red-button class="px-[10px]" @click="isEditMode = false">Cancel</red-button>
        <button-generic-reversed class="px-[10px]" @click="editUserProfile">Confirm</button-generic-reversed>
      </div>
      <div v-if="err" class="mt-[10px] text-red-800 bg-red-200 text-center rounded-[8px] p-[8px]">{{ err }}</div>
    </div>
    <div v-else>
      <loader />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainTitle from '@/components/titles/main-title.vue';
import { useUserStore } from '@/store/userStore';
import ButtonGenericReversed from '@/components/buttons/button-generic-reversed.vue';
import { reactive, ref } from 'vue';
import RedButton from '@/components/buttons/red-button.vue';
import InputGeneric from '@/components/inputs/input-generic.vue';
import { useEditUser } from '@/composables/authentication/useEditUser';
import Loader from '@/components/icons/loader.vue';

const userStore = useUserStore()
const isEditMode = ref(false)
const userToEdit = reactive({
  firstname: userStore.user ? userStore.user.firstname : '',
  lastname: userStore.user ? userStore.user.lastname : '',
  password: '',
  confirm_password: '',
})
const { err, editUser, isPreloading } = useEditUser()

const editUserProfile = async () => {
  if (userStore.user) {
    if (userToEdit.password === userToEdit.confirm_password) {
      isEditMode.value = false
      await editUser(userStore.user.id, userToEdit)
      // Then fetch user infos to update store
    } else {
      err.value = "Les mots de passe doivent être identiques"
    }
  }
  return
}
</script>
