import { Ref, ref } from 'vue';
import instance from '@/api';
import { AxiosResponse } from 'axios';
import { User } from '@/types/User';

export const useListUsers = () => {
    const users: Ref<Array<User>> = ref([])
    const errUsers: Ref<string> = ref('')
    const isPreloadingUsers = ref(false)
    const fetchUsers = async () => {
        isPreloadingUsers.value = true
        await instance.get('/users')
            .then((response: AxiosResponse<{ users: Array<User> }>) => {
                users.value = response.data.users
            })
            .catch(() => {
                errUsers.value = 'Une erreur est survenue'
            })
            .finally(() => isPreloadingUsers.value = false)
    }
    return {
        users,
        isPreloadingUsers,
        errUsers,
        fetchUsers
    }
}
