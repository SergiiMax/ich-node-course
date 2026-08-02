import bcrypt from 'bcryptjs';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';

class User extends Model {
  toJSON() {
    const values = { ...this.get() };
    delete values.passwordHash;
    return values;
  }

  async checkPassword(plain) {
    if (!this.passwordHash) return false;
    return bcrypt.compare(plain, this.passwordHash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    // defaultScope: ,
    // scopes: ,
  },
);

export default User;
