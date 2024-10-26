const express = require('express');
const passport = require('passport');

const RoutesService = require('../services/routes.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createRouteSchema, getRoutesSchema } = require('./../schemas/routes.schema');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new RoutesService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const routes = await service.find();
    res.json(routes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getRoutesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const route = await service.findOne(id);
      res.json(route);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(createRouteSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Here should be the logic for create route
      const newRoute = await service.create(body);
      res.status(201).json(newRoute);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
