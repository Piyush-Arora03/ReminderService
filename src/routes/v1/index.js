const express = require('express');
const notificationController = require('../../controllers/notification-controller');

const router = express.Router();

router.post('/notifications', notificationController.create);

module.exports = router;