import { ref } from 'vue';
import instance from '@/api';
import FlashMessagesService from '@/services/FlashMessageServices';

export const useDeleteUser = () => {
    const errorDeleteUser = ref('')
    const deleteUser = async (userId: number) => {
        await instance.delete(`/user/${userId}`)
            .then(() => { FlashMessagesService.getInstance().success(`The user ${userId} has been deleted`) })
            .catch(() => errorDeleteUser.value = `The userId ${userId} not exists`)
    }
    return {
        deleteUser,
        errorDeleteUser
    }
}
