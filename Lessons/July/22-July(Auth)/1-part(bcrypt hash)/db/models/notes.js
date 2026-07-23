import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';

class Note extends Model {}

Note.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
  }
);

export default Note;