const { Model, DataTypes, Sequelize } = require('sequelize');

const ROUTES_TABLE = 'routes';

// example of JSON for routeAddresses:
// {
//   "address": "Rua 1",
//   "customerName": "Customer Name",
//   "itemType": "Item Type"
// }

const RouteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  routeAddresses: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    unique: true,
    allowNull: false,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}


class Routes extends Model {
  static associate(models) {
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'routeId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROUTES_TABLE,
      modelName: 'Route',
      timestamps: false
    }
  }
}

module.exports = { Routes, RouteSchema, ROUTES_TABLE };
