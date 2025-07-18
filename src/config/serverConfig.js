const dotenv=require('dotenv');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    APP_ID:process.env.APP_ID,
    APP_PASS:process.env.APP_PASS
}