import instance from '@/api';
import { ref } from 'vue';
import { DataInput, ModelInfos } from '@/types/ModelInfos';

export const useOptimizeModel = () => {
    const error = ref('')
    const solution = ref([] as Array<Array<Array<number>>>)
    const id = ref('' as string)
    const modelParams = ref({} as DataInput)
    const optimizeModel = async (modelInfos: ModelInfos) => {
        error.value = ''
        await instance.post(`/model`, modelInfos)
            .then((response) => {
                const model = response.data.model
                id.value = model.id
                modelParams.value = model.data_parameters
                solution.value = model.solution
            })
            .catch((err) => {
                console.log(err)
                error.value = 'Une erreur est apparue'
            })
    }
    return {
        optimizeModel,
        modelParams,
        id,
        solution,
        error
    }
}
