import User from './User.js';
import Post from './Post.js';

// One-to-One
// User.hasOne(Post, { foreignKey: 'userId', as: 'post' });
// Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// One-to-Many
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Many-to-Many
// User.belongsToMany(Post, { through: 'usersposts', as: 'posts', foreignKey: 'userId' });
// Post.belongsToMany(User, { through: 'usersposts', as: 'users', foreignKey: 'postId' });

export { User, Post };
