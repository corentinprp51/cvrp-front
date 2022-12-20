import instance from '@/api';
import { ref } from 'vue';
import router from '@/router';
import { DataInput, ModelInfos, Parameters } from '@/types/ModelInfos';

export const useOptimizeModel = () => {
    const error = ref('')
    const solution = ref([] as Array<Array<Array<number>>>)
    const id = ref('' as string)
    const modelParams = ref({} as DataInput)
    const optimizeModel = async (modelInfos: ModelInfos) => {
        error.value = ''
        await instance.post(`/model`, modelInfos)
            .then((response) => {
                id.value = response.data.id
                modelParams.value = response.data.model
                solution.value = response.data.solution
                console.log(response.data)
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
