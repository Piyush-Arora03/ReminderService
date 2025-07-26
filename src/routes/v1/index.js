const express = require('express');
const notificationController = require('../../controllers/notification-controller');

const router = express.Router();

router.post('/notifications', notificationController.create);
router.post('/publish', notificationController.publishNotification);

module.exports = router;