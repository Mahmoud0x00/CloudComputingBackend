const NotificationsModel = require('../models/notifications');
const NotificationsService = require('../services/notifications');

module.exports.getNotification = async(req, res) => {
    try {
        const notifications = await NotificationsService.findAllNotifications();
        res.send({ notifications });
    } catch (err) {
        res.status(500); //server error
        res.send({
            error: err
        });
    }
};

//Route handler function that gets the notification info from the req. body
//and pass it to the service method
module.exports.postNotification = async (req, res) => {
    const notificationsInfo = {
        NotificationType: req.body.NotificationType,
        NotificationDetails: req.body.NotificationDetails,
        NotificationTime: req.body.NotificationTime
    };
    try {
        const notify = await NotificationsService.addToNotifications(notificationsInfo);
        return res.status(201).send({
            message: 'Notifications added successfully.',
            notificationID: notify._id
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
};