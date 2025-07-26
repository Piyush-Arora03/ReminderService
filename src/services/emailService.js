const sender = require('../config/emailConfig');
const ReminderRepository = require('./../repository/ReminderRepo');

class EmailService {
    constructor() {
        this.reminderRepository = new ReminderRepository();
    }

    async sendBasicEmail(mailTo, mailSubject, mailBody) {
        try {
            const response = await sender.sendMail({
                to: mailTo,
                subject: mailSubject,
                html: mailBody
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createTicket(data) {
        try {
            const ticket = await this.reminderRepository.create(data);
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }

    async sendConfirmationEmail(ticket) {
        try {
            console.log("sending confirmation email");
            const response = await this.sendBasicEmail(
                ticket.recepientEmail,
                ticket.subject,
                `<h3>Reminder: Your Flight Details</h3>
                <p>This is a confirmation regarding: <strong>${ticket.content}</strong></p>
                <p>We hope you have a pleasant journey!</p>`
            );
            console.log("confirmation email sent");
            return response;   
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            throw new Error('Failed to send confirmation email');
        }
    }
}
module.exports = EmailService;