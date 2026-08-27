import User from './user.js';
import Post from './post.js';

const models = {
    User,
    Post,
};

User.associate(models);
Post.associate(models);

export {
    User,
    Post,
};