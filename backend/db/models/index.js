const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Routes, RoutesSchema } = require('./routes.model');
const { Order, OrderSchema } = require('./order.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Routes.init(RoutesSchema, Routes.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Routes.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
