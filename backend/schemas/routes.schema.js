const Joi = require('joi');

const id = Joi.number().integer();
const routeAddresses = Joi.array().items(Joi.object({
  address: Joi.string().required(),
  customerName: Joi.string().required(),
  itemType: Joi.string().required(),
}));

const createRouteSchema = Joi.object({
  routeAddresses: routeAddresses.required(),
});

const getRoutesSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRouteSchema, getRoutesSchema }
