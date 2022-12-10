const NotificationsModel = require('../models/notifications');

module.exports.viewAllNotifications = async () => {
    try {
        const notifications = await NotificationsModel.find();
        return notifications;
    } catch (err) {
        throw new Error('Could not view new notifications');
    }
};

module.exports.addToNotifications = async (notificationsInfo) => {
    try {
        const notification = new NotificationsModel({
            NotificationType: notificationsInfo.NotificationType,
            NotificationDetails: notificationsInfo.NotificationDetails,
            NotificationTime: notificationsInfo.NotificationTime
        });
        const notify = await notification.save();
        return notify;
    } catch (err) {
        throw new Error('Could not notify.');
    }
};