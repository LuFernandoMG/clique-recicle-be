const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { config } = require('../config/config');
const MailService = require('./mail.service');
const UserService = require('./user.service');
const mailService = new MailService();
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Invalid password');
    }
    delete user.dataValues.password;
    return user;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery);
      if (!payload) {
        throw boom.unauthorized('Invalid token');
      }
      
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Invalid token');
      }

      const hashNewPassword = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { password: hashNewPassword, recoveryToken: null });
      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized('Error while changing password');
    }
  };

  signToken(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    }
  }

  async recoveryPassword(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecretRecovery, { expiresIn: '15m' });
    const link = `http://localhost:3000/recovery?token=${token}`;
    
    await service.update(user.id, { recoveryToken: token })
    
    const mail = {
      from: config.nodemailerMail,
      to: `${user.name} <${user.email}>`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link -> ${link}</b>`,
    }
    const rta = await mailService.sendMail(mail);
    return rta;
  }
}

module.exports = AuthService;
