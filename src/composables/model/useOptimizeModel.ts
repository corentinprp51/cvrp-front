import instance from '@/api';
import { ref } from 'vue';
import { DataInput, ModelInfos } from '@/types/ModelInfos';
import FlashMessagesService from '@/services/FlashMessageServices';

export const useOptimizeModel = () => {
    const isPreloading = ref(false)
    const error = ref('')
    const solution = ref([] as Array<Array<Array<number>>>)
    const id = ref('' as string)
    const modelParams = ref({} as DataInput)
    const optimizeModel = async (modelInfos: ModelInfos) => {
        error.value = ''
        isPreloading.value = true
        await instance.post(`/model`, modelInfos)
            .then((response) => {
                const model = response.data.model
                id.value = model.id
                modelParams.value = model.data_parameters
                solution.value = model.solution
                FlashMessagesService.getInstance().success(`The model ${model.id} - ${model.name} has been created`)
            })
            .catch((err) => {
                console.log(err)
                error.value = 'Une erreur est apparue'
            })
            .finally(() => isPreloading.value = false)
    }
    return {
        optimizeModel,
        modelParams,
        id,
        solution,
        error,
        isPreloading
    }
}
