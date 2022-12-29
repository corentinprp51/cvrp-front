import { ref, Ref } from 'vue';
import { Model } from '@/types/Model';
import instance from '@/api';
import { AxiosResponse } from 'axios';

export const useViewModel = (id: number) => {
    const model: Ref<Model | null> = ref(null)
    const err: Ref<string> = ref('')
    const isPreloading = ref(false)
    const fetchModel = async (id: number) => {
        isPreloading.value = true
        await instance.get(`/model/${id}`)
            .then((response: AxiosResponse<{ model: Model }>) => {
                model.value = response.data.model
            })
            .catch((err) => {
                err.value = 'Une erreur est survenue'
            })
            .finally(() => isPreloading.value = false)
    }
    return {
        isPreloading,
        model,
        err,
        fetchModel
    }
}
