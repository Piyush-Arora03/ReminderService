const cron = require('node-cron');
const ReminderRepository = require('../repository/ReminderRepo');
const EmailService = require('../services/emailService');

const emailService = new EmailService();
const sendBasicEmail = emailService.sendBasicEmail;

const reminderRepository = new ReminderRepository();

const setUpJob = () => {
    cron.schedule('*/2 * * * *', async () => {
        console.log('CRON-JOB: Running job to check for pending reminders...');
        try {

            const pendingTickets = await reminderRepository.getPendingTickets();

            console.log(`CRON-JOB: Found ${pendingTickets.length} pending tickets to process.`);

            for (const ticket of pendingTickets) {
                try {
                    await reminderRepository.update(ticket.id, { status: 'SENT' });
                    const emailBody = `
                        <h3>Reminder: Your Flight Details</h3>
                        <p>This is a reminder regarding: <strong>${ticket.content}</strong></p>
                        <p>We hope you have a pleasant journey!</p>
                    `;

                    await sendBasicEmail(
                        ticket.recepientEmail,
                        ticket.subject,
                        emailBody
                    );

                    console.log(`CRON-JOB: Successfully sent reminder for ticket ID: ${ticket.id}`);
                } catch (emailError) {
                    console.error(`CRON-JOB: Failed to process ticket ID: ${ticket.id}`, emailError);
                    await reminderRepository.update(ticket.id, { status: 'FAILED' });
                }
            }
        } catch (error) {
            console.error('CRON-JOB: Error occurred during the main job execution:', error);
        }
    });
}

module.exports = setUpJob;