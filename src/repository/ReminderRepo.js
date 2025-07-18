const { NotificationTicket } = require('../models/index');
const { DbError, ValidationError, AppError } = require('../utils/index');
const { Op } = require('sequelize');

class ReminderRepository {
    async getAll() {
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            } else if (error.name == 'SequelizeDatabaseError') {
                throw new DbError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot fetch notification tickets',
                'An unexpected issue occurred in the data access layer.',
                500
            );
        }
    }

    async create(data) {
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create notification ticket',
                'An unexpected issue occurred while creating the notification ticket.',
                500
            );
        }
    }

    async getPendingTickets() {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: {
                        [Op.in]: ['PENDING', 'FAILED']
                    },
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            return tickets;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw new AppError(
                'RepositoryError',
                'Cannot fetch pending tickets',
                'An unexpected issue occurred while fetching pending notification tickets.',
                500
            );
        }
    }

    async update(ticketId, data) {
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            if (!ticket) {
                throw new AppError('RepositoryError', 'Ticket not found', `No notification ticket found with ID: ${ticketId}`, 404);
            }
            ticket.status = data.status;
            await ticket.save();
            return ticket;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw new AppError('RepositoryError', 'Cannot update the ticket', 'An unexpected issue occurred while updating the notification ticket.', 500);
        }
    }
}

module.exports = ReminderRepository;