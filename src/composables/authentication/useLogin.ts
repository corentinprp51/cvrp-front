import instance from '@/api';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import router from '@/router';
import { User } from '@/types/User';

export const useLogin = () => {
    const err = ref('')
    const userStore = useUserStore()
    const login = async (userInfos: { username: string; password: string }) => {
        err.value = ''
        await instance.post(`/login`, userInfos)
            .then((response: { data: {access_token: string, refresh_token: string, user: User} }) => {
                userStore.setToken(response.data.access_token)
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('refresh_token', response.data.refresh_token)
                userStore.setUser({...response.data.user})
                router.push('/')
            })
            .catch((error) => {
                console.log(error)
                err.value = 'Une erreur est apparue'
            })
    }
    return {
        login,
        err
    }
}
