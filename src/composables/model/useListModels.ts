import { Ref, ref } from 'vue';
import { Model } from '@/types/Model';
import instance from '@/api';
import { AxiosResponse } from 'axios';

export const useListModels = () => {
    const models: Ref<Array<Model>> = ref([])
    const err: Ref<string> = ref('')
    const fetchModels = async () => {
        await instance.get('/models')
            .then((response: AxiosResponse<{ models: Array<Model> }>) => {
                console.log(response.data)
                models.value = response.data.models
            })
            .catch((err) => {
                err.value = 'Une erreur est survenue'
            })
    }
    fetchModels()
    return {
        models,
        err,
        fetchModels
    }
}
