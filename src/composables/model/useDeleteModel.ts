import { ref } from 'vue';
import instance from '@/api';
import FlashMessagesService from '@/services/FlashMessageServices';

export const useDeleteModel  = () => {
    const err = ref('')
    const deleteModel = async (modelId: number) => {
        await instance.delete(`/model/${modelId}`)
            .then(() => {
                FlashMessagesService.getInstance().success(`The model ${modelId} has been deleted`)
            })
            .catch(() => err.value = 'Une erreur est survenue')
    }
    return {
        err,
        deleteModel
    }

}
