import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import FlashMessagesService from '@/services/FlashMessageServices';
import router from '@/router';

const baseURL = import.meta.env.VITE_BASE_URL
const instance = axios.create({
    baseURL,
    // timeout: 10000,
    // headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
})

instance.interceptors.request.use((request) => {
    const userStore = useUserStore()
    if (request && request.headers && request.url && !request.url.includes('refresh')) {
        request.headers.Authorization = `Bearer ${userStore.token || localStorage.getItem('token')}`
    }
    if (request && request.headers && request.url && request.url.includes('refresh')){
        request.headers.Authorization = `Bearer ${localStorage.getItem('refresh_token')}`
    }
    return request
})

instance.interceptors.response.use(response => response, async (error) => {
    if(error) {
        if (error.response) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {

                originalRequest._retry = true;
                // Refresh Token Request
                const userStore = useUserStore()
                await instance.post('/refresh')
                    .then((response) => {
                        userStore.setToken(response.data.access_token)
                        localStorage.setItem('token', response.data.access_token)
                    })
                    .catch(() => {
                        userStore.logout()
                    })
            }
            if (error.response.status === 500 || error.response.status === 400) {
                FlashMessagesService.getInstance().error('Une erreur est survenue')
            }
            if (error.response.status === 422) {
                await router.push('/login')
            }
            return Promise.reject({ errors: error.response.data.errors ,status: error.response.status })
        } else if (error.message && error.message === "Network error") {
            FlashMessagesService.getInstance().error('Une erreur est survenue')
        }
    }
})

export default instance
