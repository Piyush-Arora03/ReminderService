const nodemailer = require('nodemailer');
const { APP_ID, APP_PASS } = require('./serverConfig');

const sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: APP_ID,
        pass: APP_PASS
    }
});

module.exports = sender;