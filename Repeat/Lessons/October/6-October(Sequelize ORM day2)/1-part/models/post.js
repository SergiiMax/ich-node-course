import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Post = sequelize.define('Post',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // имя таблицы
                key: 'id', // столбец таблицы
            },
            onUpdate: 'CASCADE', // Если мы изменяем users.id, то изменяется и posts.userId
            onDelete: 'CASCADE', // удалили пользователя, удалили и его посты
        }
    },
    {
        tableName: 'posts',
        timestamps: true,
    }
);

export default Post;