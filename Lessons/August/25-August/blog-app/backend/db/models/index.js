import User from './user.js';
import Post from './post.js';

User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

export {
  User,
  Post,
};