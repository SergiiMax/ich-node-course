import { api } from './client';

export interface Post {
    id: number;
    title: string;
    subtitle: string;
    body: string;
    subject: string | null;
    userId: number;
    createdAt: string;
    user?: { username: string };
}

export interface NewPost {
    title: string;
    subtitle: string;
    body: string;
    subject: string;
}

export const postsApi = {
    list: () => api<{ posts: Post[] }>('/api/posts'),
    create: (post: NewPost) => api<{ post: Post }>('/api/posts', { method: 'POST', body: post }),
    remove: (id: number) => api<void>(`/api/posts/${id}`, { method: 'DELETE' }),
};
