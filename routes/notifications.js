const { Router } = require('express');

const NotificationsController = require('../controllers/notifications');

const NotificationsRouter = Router();

NotificationsRouter.get('/', NotificationsController.getNotification);

//Registering the route handler for POST requests on notifications route '/'
NotificationsRouter.post('/', NotificationsController.postNotification);

module.exports = NotificationsRouter;