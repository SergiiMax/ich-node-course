import sequelize from "../config/db.js";

import User from "./user.js";
import Post from "./post.js";

User.hasMany(Post, {
    // Имя столбца внешнего ключа таблицы Posts
    // Если не указать, то Sequelize придумает сам UserId (с большой буквы)
    // и оно не будет совпадать с полем userId, которое мы написали с маленькой буквы
    foreignKey: 'userId',
    /**
     * as - это имя, под которым связь видна в коде. От него зависят три вещи.
     * 1) Имя ключа в результатах запроса в include
     *      as: 'posts' - массив постов user.posts
     *      as: 'user' - объект пользователя post.user
     */
    as: 'posts'
});

Post.belongsTo(User, {
    /**
     * Тот же самый столбец, что и в hasMany. Обе стороны связи должны указывать одно и тоже имя, иначе Sequelize решит, что это две разные связи, и будет искать или создавать столбец UserId (с большой буквы)
     */
    foreignKey: 'userId',

    // Псевдоним связи со стороны поста. Единственное число, потому что владелец у поста один.
    // as: 'user' - объект пользователя post.user
    as: 'user'
});


export { sequelize, User, Post }; 