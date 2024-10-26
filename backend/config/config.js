require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  nodemailerMail: process.env.NODEMAILER_MAIL,
  nodemailerPass: process.env.NODEMAILER_PASS,
  nodemailerReceiver: process.env.NODEMAILER_RECEIVER,
}

module.exports = { config };
