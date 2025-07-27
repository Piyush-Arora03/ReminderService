# Reminder Service

A microservice designed to handle email notifications for a flight booking system. It sends booking confirmations and schedules flight reminders.

This service listens to a message queue for new booking events. Upon receiving a message, it performs two main actions:
1.  Immediately sends a booking confirmation email to the user.
2.  Creates a reminder notification in the database, scheduled to be sent 24 hours before the flight's departure time.

A background job periodically checks for pending reminders and sends them out at the scheduled time.

## Core Features

- **Message-Driven**: Integrates with RabbitMQ to asynchronously process notification requests.
- **Email Confirmation**: Instantly sends booking confirmation emails using Nodemailer.
- **Scheduled Reminders**: Schedules and stores flight reminders in a MySQL database.
- **Persistent Notifications**: Uses Sequelize ORM to manage notification data.
- **Cron Jobs**: (Ready to be enabled) Uses `node-cron` to periodically send scheduled reminder emails.
- **Configurable**: Uses environment variables for easy configuration of ports, database credentials, and email settings.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Messaging**: RabbitMQ with `amqplib`
- **Emailing**: Nodemailer
- **Scheduling**: `node-cron`
- **Environment**: `dotenv`

## Project Structure

```
ReminderService/
├── src/
│   ├── config/          # Configuration files
│   │   ├── config.js    # Server configuration
│   │   └── emailConfig.js # Nodemailer configuration
│   ├── controllers/     # Route handlers
│   ├── repository/      # Data access layer
│   │   └── ReminderRepo.js # Reminder repository
│   ├── routes/          # API routes
│   │   └── index.js       # Main route file
│   ├── services/        # Business logic
│   │   └── emailService.js # Email sending service
│   ├── utils/           # Utility functions
│   │   ├── job.js         # Cron jobs setup
│   │   └── MessageQueue.js # RabbitMQ connection and subscription
│   ├── index.js         # Main application file
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── README.md            # Documentation
```

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- npm
- MySQL Server
- RabbitMQ Server

### 1. Clone the Repository

```bash
git clone https://github.com/Piyush-Arora03/ReminderService.git
cd ReminderService
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project by copying the sample file:

```bash
cp .env.sample .env
```

Now, open the `.env` file and fill in the required values for your local environment.

### 4. Setup Database

Make sure your MySQL server is running. Update the database credentials in `src/config/config.json` for the `development` environment.

Run the database migrations to create the necessary tables:

```bash
npx sequelize-cli db:migrate
```

### 5.RabbitMQ Setup
Install RabbitMQ: Follow the instructions on the RabbitMQ website to install RabbitMQ on your system.

Start RabbitMQ Server: Start the RabbitMQ server using the appropriate command for your operating system.

Configure RabbitMQ Connection: Ensure the connection details in `MessageQueue.js` are correct.

### 6. Start the Server

```bash
npm start
```

The server will start on the port specified in your `.env` file and will connect to the RabbitMQ message broker.

## Message Queue Workflow

The service subscribes to a queue and expects messages in a specific JSON format.

### Expected Message Payload

When another service (e.g., a Booking Service) publishes a message to the queue, it should have the following structure:

```json
{
  "recepientEmail": "customer@example.com",
  "subject": "Flight Booking Confirmation",
  "content": "Your booking for flight UK-123 from DEL to BLR is confirmed.",
  "departureTime": "2025-08-15T10:00:00Z"
}
```

- `recepientEmail`: The email address of the user.
- `subject`: The subject for the confirmation email.
- `content`: The main content for the confirmation email.
- `departureTime`: The flight's departure time in ISO 8601 format. This is crucial for scheduling the reminder.