import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';

class Item extends Model {}

Item.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Item',
  },
);

export default Item;
