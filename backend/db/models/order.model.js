const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');
const { ROUTES_TABLE } = require('./routes.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerAddress: {
    field: 'customer_address',
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: true,
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  itemType: {
    field: 'item_type',
    allowNull: false,
    type: DataTypes.STRING,
  },
  routeId: {
    field: 'route_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ROUTES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}


class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsTo(models.Route, {
      as: 'route'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
