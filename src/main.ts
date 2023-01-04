import { ComponentPublicInstance, createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '@/router';
import { useUserStore } from '@/store/userStore';
import instance from '@/api';

const pinia = createPinia()
pinia.use(({ store }) => { store.router = markRaw(router) })
const app = createApp(App).use(pinia).use(router)
let vm: ComponentPublicInstance

export const setUserStore = async () => {
    if (localStorage.getItem('token')){
        const userStore = useUserStore()
        await instance.get('user').then((response) => {
            userStore.setUser(response.data)
        }).catch(() => {})
    }
}
await setUserStore()
// @ts-ignore
if (!vm) {
    vm = app.mount('#app')
}
