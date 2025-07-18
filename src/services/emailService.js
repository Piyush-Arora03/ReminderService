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
}
module.exports = EmailService;