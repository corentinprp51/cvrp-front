import instance from '@/api';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import router from '@/router';

export const useLogin = () => {
    const err = ref('')
    const userStore = useUserStore()
    const login = async (userInfos: { username: string; password: string }) => {
        err.value = ''
        await instance.post(`/login`, userInfos)
            .then((response) => {
                userStore.setToken(response.data.access_token)
                localStorage.setItem('token', response.data.access_token)
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
