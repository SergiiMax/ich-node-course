import type User from './user.js';
import type Post from './post.js';

export type Models = {
    User: typeof User;
    Post: typeof Post;
};