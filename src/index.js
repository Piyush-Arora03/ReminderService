const express = require('express');
const body_parser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const setUpJob = require('./utils/job');
const apiRoutes = require('./routes/index');
const {subscribeToQueue} = require('./utils/MessageQueue');
const EmailService = require('./services/emailService');
const emailService = new EmailService();

const app = express();

const SetUpAndStartServer = () => {
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    subscribeToQueue(async (message) => {
        // console.log('Received message from queue:', message);
        await emailService.sendConfirmationEmail(message);
        // console.log('Confirmation email sent for message:', message);
    }, 'NOTIFICATION_SERVICE'); 
    app.listen(PORT, () => {
        console.log(`server started at ${PORT}`);
        // setUpJob();
        // console.log('Cron jobs have been initiated.');

    });
}

SetUpAndStartServer();
