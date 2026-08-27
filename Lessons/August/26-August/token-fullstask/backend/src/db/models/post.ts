import {
    DataTypes,
    Model,
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes,
} from 'sequelize';
import sequelize from '../connection.js';
import {Models} from "./types.js";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare subtitle: string;
    declare body: string;
    declare subject: string;
    declare userId: number;

    static associate(models: Models) {
        Post.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        })
    }
}

Post.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        subtitle: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'user_id',
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
        underscored: true,
    }
);

export default Post;