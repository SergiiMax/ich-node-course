import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';

class App extends Model {}

App.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: 'App',
    tableName: 'Apps',
    timestamps: false
  }
);

export default App;