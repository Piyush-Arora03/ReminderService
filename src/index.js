const express = require('express');
const body_parser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const setUpJob = require('./utils/job');
const apiRoutes = require('./routes/index');
const { subscribeToQueue } = require('./utils/MessageQueue');
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
        const flightTime = newDate(message.departureTime);
        const notificationTime = newDate(flightTime.getTime() - 24 * 60 * 60 * 1000);
        const notificationPayload = {
            subject: `Reminder: Your flight is in 24 hours`,
            content: `This is a reminder for your flight scheduled at ${flightTime.toLocaleString()}.`,
            recepientEmail: data.recepientEmail,
            notificationTime: notificationTime,
            status: 'PENDING'
        };
        await emailService.createTicket(notificationPayload);
        // console.log('Confirmation email sent for message:', message);
    }, 'NOTIFICATION_SERVICE');
    app.listen(PORT, () => {
        console.log(`server started at ${PORT}`);
        // setUpJob();
        // console.log('Cron jobs have been initiated.');

    });
}

SetUpAndStartServer();
