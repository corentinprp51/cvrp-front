import { ref, Ref } from 'vue';
import { Model } from '@/types/Model';
import instance from '@/api';
import { AxiosResponse } from 'axios';

export const useViewModel = (id: number) => {
    const model: Ref<Model | {}> = ref({})
    const err: Ref<string> = ref('')
    const fetchModel = async (id: number) => {
        await instance.get(`/model/${id}`)
            .then((response: AxiosResponse<{ model: Model }>) => {
                model.value = response.data.model
            })
            .catch((err) => {
                err.value = 'Une erreur est survenue'
            })
    }
    fetchModel(id)
    return {
        model,
        err,
        fetchModel
    }
}
