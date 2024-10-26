const { config } = require('../config/config');
const nodemailer = require('nodemailer');

class MailService {
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
          user: config.nodemailerMail, // generated ethereal user
          pass: config.nodemailerPass // generated ethereal password
      }
    });

    await transporter.sendMail(infoMail);

    return { message: 'Recovery email sent' };
  }
}

module.exports = MailService;
