import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const baseURL = import.meta.env.VITE_BASE_URL
const instance = axios.create({
    baseURL,
    // timeout: 10000,
    // headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
})

instance.interceptors.request.use((request) => {
    const userStore = useUserStore()
    if (request && request.headers) {
        request.headers.Authorization = `Bearer ${userStore.token || localStorage.getItem('token')}`
    }
    return request
})

// instance.interceptors.response.use(response => response, async (error) => {
//     if (error.response.status === 500 || error.response.status === 400) {
//         FlashMessagesService.getInstance().error()
//     }
//     if (error.response.status === 422) {
//         if (error.response.data.errors.length > 0) {
//             return Promise.reject({...error.response.data.errors[0], status: error.response.status })
//         }
//     }
//     return Promise.reject({ errors: error.response.data.errors ,status: error.response.status })
// })

// Token expiration
instance.interceptors.response.use(undefined, function (error) {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;
            const userStore = useUserStore()
            userStore.logout()
        }
    }
})

export default instance
