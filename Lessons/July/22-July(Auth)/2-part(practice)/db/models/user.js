import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import bcrypt from 'bcryptjs';

class User extends Model {
  comparePassword(password) {
    return bcrypt.compare(password, this.password)
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      async beforeSave(user) {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    }
  }
);

export default User;