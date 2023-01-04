import instance from '@/api';
import FlashMessagesService from '@/services/FlashMessageServices';
import { ref } from 'vue';

export const useSetAdmin = () => {
    const errorSetAdmin = ref('')
    const setAdmin = async (userId: number) => {
        if (userId){
            await instance.post('admin', { userId })
                .then(async () => {
                    FlashMessagesService.getInstance().success(`The user ${userId} is now admin`)
                })
                .catch((() => errorSetAdmin.value = "This user doesn't exist"))
        } else {
            errorSetAdmin.value = 'Please write user id'
        }
    }

    return {
        setAdmin,
        errorSetAdmin
    }
}
