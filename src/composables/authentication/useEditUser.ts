import instance from '@/api';
import { ref } from 'vue';
import FlashMessagesService from '@/services/FlashMessageServices';
import { useUserStore } from '@/store/userStore';

export const useEditUser = () => {
    const err = ref('')
    const isPreloading = ref(false)
    const editUser = async (userId: number, userEdit: {firstname: string, lastname: string, password: string, confirm_password: string}) => {
        err.value = ''
        isPreloading.value = true
        await instance.put(`/user/${userId}`, userEdit)
            .then(async () => {
                FlashMessagesService.getInstance().success('Profile Updated!')
                await fetchUser()
            })
            .catch(() => {
                err.value = 'An error has occured'
            })
            .finally(() => isPreloading.value = false)
    }
    const fetchUser = async () => {
        const userStore = useUserStore()
        await instance.get('user').then((response) => {
            userStore.setUser(response.data)
        }).catch(() => err.value = "Impossible d'actualiser les données de l'utilisateur")
    }
    return {
        err,
        isPreloading,
        editUser
    }
}
