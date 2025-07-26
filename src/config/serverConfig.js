const dotenv=require('dotenv');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    APP_ID:process.env.APP_ID,
    APP_PASS:process.env.APP_PASS,
    MESSAGE_BROKER_URL:process.env.MESSAGE_BROKER_URL,
    QUEUE_NAME:process.env.QUEUE_NAME,
    EXCHANGE_NAME:process.env.EXCHANGE_NAME,
    BINDING_KEY_NOTIFICATION_SERVICE:process.env.BINDING_KEY_NOTIFICATION_SERVICE
}