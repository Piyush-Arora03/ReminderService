const EmailService = require('../services/emailService');
const { StatusCodes } = require('http-status-codes');
const {createChannel, publishMessage, subscribeToQueue} = require('../utils/MessageQueue');
const emailService=new EmailService();

let channel;

const publishNotification = async (req, res) => {
    try {
        if(!channel) {
            channel = await createChannel();
        }
        const message = req.body;
        await publishMessage(channel, 'notification_queue', message); // Assuming 'notification_queue' is your binding key
        return res.status(StatusCodes.OK).json({
            data: message,
            success: true,
            message: 'Successfully published notification',
            err: {}
        });
    } catch (error) {
        console.error('Error publishing notification:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Failed to publish notification',
            err: error || 'Something went wrong while publishing notification'
        });
    }
}


const create = async (req, res) => {
    try {
        const response = await emailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail,
            notificationTime: req.body.notificationTime,
            status: 'PENDING'
        });
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            message: 'Successfully registered a notification',
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: error.message || 'Unable to register a notification',
            err: error.explanation || 'Something went wrong in the controller'
        });
    }
};

module.exports = { create ,
    publishNotification
};