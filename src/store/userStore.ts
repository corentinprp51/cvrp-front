import { defineStore, StoreDefinition } from 'pinia';
import { User } from '@/types/User';

type State = {
    user: null | User;
    token: null | string;
}
export const useUserStore: StoreDefinition<"user", State>
    = defineStore('user', {
    state: () => {
        return {
            user: null,
            token: null
        } as State
    },
    actions: {
        setUser(user: User | null) {
            this.user = user;
        },
        setToken(token: string | null) {
            this.token = token;
        },
        logout() {
            this.setUser(null)
            this.setToken(null)
            localStorage.removeItem('token')
            this.router.go('/login')

        }
    }
});
