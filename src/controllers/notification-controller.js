const EmailService = require('../services/emailService');
const { StatusCodes } = require('http-status-codes');

const emailService=new EmailService();

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

module.exports = { create };