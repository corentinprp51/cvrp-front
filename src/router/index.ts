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
    {
        path: '/model/:id',
        name: 'model-view',
        component: () => import('@/views/model-view.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/model/:id/edit',
        name: 'model-edit',
        component: () => import('@/views/model-edit-view.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/model/new',
        name: 'model-new',
        component: () => import('@/views/model-create-view.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile-view.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin-view.vue'),
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/admin/user/:id/edit',
        name: 'admin-edit-user',
        component: () => import('@/views/admin-edit-user.vue'),
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/admin/user/:id/view',
        name: 'admin-view-user',
        component: () => import('@/views/admin-view-user.vue'),
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const needAuth = to.meta.requiresAuth
    const forAdminOnly = to.meta.requiresAdmin
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
    if(userStore.user && !userStore.user.isAdmin && forAdminOnly) {
        next('/')
        return
    }
    next()
})

export default router
