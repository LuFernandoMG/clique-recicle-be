const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const customerAddress = Joi.string();
const itemType = Joi.string();
const routeId = Joi.number().integer();
const orderId = Joi.number().integer();
const price = Joi.number().precision(2);
const status = Joi.string();

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  customerAddress: customerAddress.required(),
  itemType: itemType.required(),
  price: price.required(),
  status: status.required(),
});

const updateOrderSchema = Joi.object({
  orderId: orderId.required(),
  routeId: routeId.required(),
  status: status.required(),
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema };
