import { Ref, ref } from 'vue';
import { Model } from '@/types/Model';
import instance from '@/api';
import { AxiosResponse } from 'axios';

export const useListModels = () => {
    const models: Ref<Array<Model>> = ref([])
    const err: Ref<string> = ref('')
    const isPreloading = ref(false)
    const fetchModels = async () => {
        isPreloading.value = true
        await instance.get('/models')
            .then((response: AxiosResponse<{ models: Array<Model> }>) => {
                models.value = response.data.models
            })
            .catch((err) => {
                err.value = 'Une erreur est survenue'
            })
            .finally(() => isPreloading.value = false)
    }
    fetchModels()
    return {
        models,
        isPreloading,
        err,
        fetchModels
    }
}
