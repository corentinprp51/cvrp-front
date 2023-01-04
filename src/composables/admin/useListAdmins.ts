import { Ref, ref } from 'vue';
import instance from '@/api';
import { AxiosResponse } from 'axios';
import { User } from '@/types/User';

export const useListAdmins = () => {
    const admins: Ref<Array<User>> = ref([])
    const errAdmin: Ref<string> = ref('')
    const isPreloadingAdmin = ref(false)
    const fetchAdmins = async () => {
        isPreloadingAdmin.value = true
        await instance.get('/admin')
            .then((response: AxiosResponse<{ admins: Array<User> }>) => {
                admins.value = response.data.admins
            })
            .catch(() => {
                errAdmin.value = 'Une erreur est survenue'
            })
            .finally(() => isPreloadingAdmin.value = false)
    }
    return {
        admins,
        isPreloadingAdmin,
        errAdmin,
        fetchAdmins
    }
}
