import instance from '@/api';
import { ref } from 'vue';
import FlashMessagesService from '@/services/FlashMessageServices';
import { User } from '@/types/User';

export const useEditUserAdmin = () => {
    const errEdit = ref('')
    const isPreloadingEdit = ref(false)
    const editUser = async (userId: number, userEdit: User & {password: string; confirm_password: string}) => {
        errEdit.value = ''
        isPreloadingEdit.value = true
        await instance.put(`/user/${userId}`, userEdit)
            .then(async () => {
                FlashMessagesService.getInstance().success(`User ${userId} updated!`)
                // await router.push({name: 'admin'})
            })
            .catch((err) => {
                errEdit.value = err.message
            })
            .finally(() => isPreloadingEdit.value = false)
    }
    return {
        errEdit,
        isPreloadingEdit,
        editUser
    }
}
