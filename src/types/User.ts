import { Model } from '@/types/Model';

export interface User {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    isAdmin: boolean;
    access_token: string;
    id: number;
    refresh_token: string;
    models: Array<Model>
}
