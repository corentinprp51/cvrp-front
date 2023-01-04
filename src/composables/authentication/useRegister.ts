import instance from '@/api';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import router from '@/router';

interface UserRegister {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export const useRegister = () => {
    const err = ref('')
    const userStore = useUserStore()
    const register = async (userInfos: UserRegister) => {
        err.value = ''
        await instance.post(`/register`, userInfos)
            .then((response) => {
                userStore.setToken(response.data.access_token)
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('refresh_token', response.data.refresh_token)
                userStore.setUser({...response.data})
                router.push('/')
            })
            .catch((error) => {
                console.log(error)
                err.value = 'Une erreur est apparue'
            })
    }
    return {
        register,
        err
    }
}
