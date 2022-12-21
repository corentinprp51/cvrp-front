import { ref } from 'vue';
import instance from '@/api';
import { useRouter } from 'vue-router';

export const useDeleteModel  = () => {
    const err = ref('')
    const router = useRouter()
    const deleteModel = async (modelId: number) => {
        await instance.delete(`/model/${modelId}`)
            .then(() => router.go(0))
            .catch(() => err.value = 'Une erreur est survenue')
    }
    return {
        err,
        deleteModel
    }

}
