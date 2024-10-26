const { Strategy } = require('passport-local');
const AuthServices = require('../../../services/auth.service');

const service = new AuthServices();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await service.getUser(email, password);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = LocalStrategy;