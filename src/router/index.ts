import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/userStore';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/models-list-view.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login-view.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register-view.vue'),
    },
    // {
    //     path: '/models',
    //     name: 'models',
    //     component: () => import('@/views/models-list-view.vue'),
    // },
    {
        path: '/model/:id',
        name: 'model-view',
        component: () => import('@/views/model-view.vue'),
    },
    {
        path: '/model/:id/edit',
        name: 'model-edit',
        component: () => import('@/views/model-edit-view.vue'),
    },
    {
        path: '/model/new',
        name: 'model-new',
        component: () => import('@/views/model-create-view.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile-view.vue'),
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin-view.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const needAuth = to.meta.requiresAuth
    const userStore = useUserStore()
    if (!userStore.token && localStorage.getItem('token')) {
        userStore.setToken(localStorage.getItem('token'))
    }
    if (!userStore.token && needAuth) {
        next({name: 'login'})
        return
    } else if (userStore.token && (to.name === 'login' || to.name === 'register')) {
        next('/')
        return
    }
    next()
})

export default router
