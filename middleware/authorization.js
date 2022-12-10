const jwt = require('jsonwebtoken');

let Tickets = require('../models/Ticket');
let commentModel = require('../models/Comment');
let attachmentModel = require('../models/Attachment');

module.exports.checkOwnership = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;
        const ticketId = req.params.ticketId || req.body.ticketId;
        const ticket = await Tickets
            .findOne({
                _id: ticketId
            });
        if (ticket.Owner._id === userId) {
            next();
        }
        else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
    }
    catch (err) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

module.exports.checkCommentOwnership = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;
        const commentId = req.params.commentId;
        const comment = await commentModel
            .findOne
            ({
                _id: commentId
            });
        if (comment.Owner._id === userId) {
            next();
        }
        else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
    }
    catch (err) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

module.exports.checkAttachmentOwnership = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;
        const attachmentId = req.params.attachmentId;
        const attachment = await attachmentModel.findOne({
            _id: attachmentId
        });
        if (attachment.Owner._id === userId) {
            next();
        }
        else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
    }
    catch (err) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
