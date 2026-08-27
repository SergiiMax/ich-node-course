import { api } from './client';

export interface User {
    id: number;
    username: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

interface UserResponse {
    user: User;
}

export const authApi = {
    register: (username: string, email: string, password: string) =>
        api<UserResponse>('/api/auth/register', { method: 'POST', body: { username, email, password } }),

    login: (email: string, password: string) =>
        api<UserResponse>('/api/auth/login', { method: 'POST', body: { email, password } }),

    logout: () => api<{ ok: true }>('/api/auth/logout', { method: 'POST' }),

    // единственный способ узнать, залогинены ли мы: спросить сервер
    me: () => api<UserResponse>('/api/auth/me'),
};
