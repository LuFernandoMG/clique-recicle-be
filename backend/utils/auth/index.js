const passport = require('passport');
const JwtStrategy = require('./strategies/jwt.strategy');
const LocalStrategy = require('./strategies/local.strategy');

passport.use('local', LocalStrategy);
passport.use('jwt', JwtStrategy);