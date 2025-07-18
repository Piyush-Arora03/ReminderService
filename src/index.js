const express = require('express');
const body_parser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const setUpJob = require('./utils/job');
const apiRoutes = require('./routes/index');

const app = express();

const SetUpAndStartServer = () => {
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`server started at ${PORT}`);
        setUpJob();
        console.log('Cron jobs have been initiated.');
    });
}

SetUpAndStartServer();
