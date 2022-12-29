import instance from '@/api';
import { ref } from 'vue';
import { DataInput, ModelInfos } from '@/types/ModelInfos';
import { InputParameters } from '@/types/Model';

export const useEditModel = () => {
    const error = ref('')
    const editModel = async (modelId: number, parameters: {name: string; parameters: InputParameters}) => {
        error.value = ''
        await instance.put(`/model/${modelId}`, parameters)
            .then((response) => {
                console.log('ok')
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
                error.value = 'Une erreur est apparue'
            })
    }
    return {
        error,
        editModel
    }
}
