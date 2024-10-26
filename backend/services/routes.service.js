const boom = require('@hapi/boom');
const UserService = require('./user.service');
const MailService = require('./mail.service');
const { models }= require('../libs/sequelize');
const userService = new UserService();
const mailService = new MailService();
const { config } = require('../config/config');

class RoutesService {

  constructor(){
  }
  async create(data) {
    const newRoute = await models.Routes.create(data);
    return newRoute;
  }

  async find() {
    const routes = await models.Routes.findAll();
    return routes;
  }

  async findOne(id) {
    const routes = await models.Routes.findByPk(id);
    return routes;
  }

  async anounceRoute(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const mail = {
      from: config.nodemailerMail,
      to: `${user.name} <${user.email}>`,
      subject: 'Your order was assigned to a Route',
      html: `<b>Your route was generated, check it out in our web</b>`,
    }
    const rta = await mailService.sendMail(mail);
    return rta;
  }
}

module.exports = RoutesService;
