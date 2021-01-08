const nodemailer = require('nodemailer');
const path = require('path');
const mailerConfig = require('../config/mailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport(mailerConfig);


transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/'),
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}))

module.exports = transport;
