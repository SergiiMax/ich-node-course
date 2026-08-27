import bcrypt from 'bcrypt'
import {
    DataTypes,
    Model,
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes,
} from 'sequelize';
import sequelize from '../connection.js';
import {Models} from "./types.js";

const SALT_ROUNDS = 10;

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;

    static associate(models: Models) {
        User.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts',
        })
    }

    toJSON() {
        const {password, ...user} = this.get();
        return user;
    }

    comparePassword(plain: string): Promise<boolean> {
        return bcrypt.compare(plain, this.password);
    }
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: true,
        timestamps: true,
        hooks: {
            async beforeSave(user) {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
                }
            },
        },
    }
);

export default User;