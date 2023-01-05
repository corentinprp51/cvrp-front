import { Ref, ref } from 'vue';
import { User } from '@/types/User';
import instance from '@/api';

export const useGetUser = () => {
    const user: Ref<User | null> = ref(null)
    const err = ref('')
    const isPreloading = ref(false)
    const fetchUser = async (userId: number) => {
        isPreloading.value = true
        await instance.get(`/admin/user/${userId}`)
            .then((response: { data: User}) => {
                user.value = response.data
            })
            .catch(() => err.value = 'The user does not exist')
            .finally(() => isPreloading.value = false)
    }
    return {
        user,
        err,
        isPreloading,
        fetchUser
    }
}
