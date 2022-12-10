const { Router } = require('express');

const NotificationsController = require('../controllers/notifications');

const NotificationsRouter = Router();

const isAuthenticated = require('../middleware/auth');

NotificationsRouter.get('/',isAuthenticated, NotificationsController.getNotification);

//Registering the route handler for POST requests on notifications route '/'
NotificationsRouter.post('/',isAuthenticated, NotificationsController.postNotification);

module.exports = NotificationsRouter;