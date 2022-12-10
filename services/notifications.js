const NotificationsModel = require('../models/notifications');
const axios = require('axios');

module.exports.SlackAgents = async (ticketInfo) => {
    try {
        const slack = await axios.post(process.env.SLACK_WEBHOOK_URL, {
            text: `Ticket ${ticketInfo.ticketName} has been created by ${ticketInfo.email}`
        });
        if(slack === "ok"){
            return true;
        }else{
            return false;
        }
    } catch (err) {
        throw new Error('Could not send slack message.');
    }
};

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
            NotificationTime: notificationsInfo.NotificationTime,
            Owner: notificationsInfo.Owner
        });
        const notify = await notification.save();
        return notify;
    } catch (err) {
        throw new Error('Could not notify.');
    }
};

module.exports.findAllNotifications = async (userId) => {
    try {
        const notifications = await NotificationsModel.find({
            Owner: userId
        });
        return notifications;
    } catch (err) {
        throw new Error('Could not view notifications');
    }
}
