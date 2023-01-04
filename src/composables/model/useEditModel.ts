import instance from '@/api';
import { ref } from 'vue';
import { InputParameters } from '@/types/Model';
import FlashMessagesService from '@/services/FlashMessageServices';

export const useEditModel = () => {
    const error = ref('')
    const isLoadingEdit = ref(false)
    const editModel = async (modelId: number, parameters: {name: string; parameters: InputParameters; needEmail: boolean}) => {
        error.value = ''
        isLoadingEdit.value = true
        await instance.put(`/model/${modelId}`, parameters)
            .then(() => {
                FlashMessagesService.getInstance().success(`The model ${modelId} has been edited`)
            })
            .catch((err) => {
                console.log(err)
                error.value = 'Une erreur est apparue'
            })
            .finally(() => isLoadingEdit.value = false)
    }
    return {
        error,
        editModel,
        isLoadingEdit
    }
}
