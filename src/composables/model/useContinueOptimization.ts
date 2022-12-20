import instance from '@/api';
import { ref } from 'vue';
import { DataInput, ModelExisting, Parameters } from '@/types/ModelInfos';

export const useContinueOptimization = () => {
    const err = ref('')
    const sol = ref([] as Array<Array<Array<number>>>)
    const identifier = ref('' as string)
    const modelP = ref({} as DataInput)
    const optimizeExistingModel = async (modelInfos: ModelExisting) => {
        err.value = ''
        await instance.put(`/model`, modelInfos)
            .then((response) => {
                identifier.value = response.data.id
                modelP.value = response.data.model
                sol.value = response.data.solution
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
                err.value = 'Une erreur est apparue'
            })
    }
    return {
        optimizeExistingModel,
        modelP,
        identifier,
        sol,
        err
    }
}
