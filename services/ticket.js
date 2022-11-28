
const TicketModel = require('../models/ticket');

const AttachementModel = require('../models/attachment');
const { model } = require('mongoose');

module.exports.createTicket = async (ticketInfo) => {
    try {
        const { title, description, status, Owner } = ticketInfo;

        const ticket = new TicketModel({
            title: title,
            description: description,
            status: status,
            Owner: Owner
        });

        await ticket.save();
    }catch(err){
        throw new Error("Error while creating ticket");
    }
}

// TODO: Add validation to check if the user is the owner of the ticket
module.exports.getTickets = async (userId) => {
    try {
        const tickets = await TicketModel.find({
            Owner: userId
        });

        return tickets;
    }catch(err){
        throw new Error("Error while getting tickets");
    }
}   

// TODO: Add validation to check if the user is the owner of the ticket

// The main concept of this function is to get ticket info by ID
module.exports.getTicket = async (ticketId) => {
    try {
        const ticket = await TicketModel.findOne({
            _id: ticketId
            });
        return ticket;
    }catch(err){
        throw new Error("Error while getting ticket");
    }
}

// TODO: Add validation to check if the user is the owner of the ticket
module.exports.AddComment = async (commentInfo) => {
    try {
        const { message, Owner, Ticket } = commentInfo;

        const comment = new CommentModel({
            comment: message,
            Owner: Owner,
            Ticket: Ticket
        });

        await comment.save();
    }catch(err){
        throw new Error("Error while adding comment");
    }
}

// TOOD: Add validation to check if the user is the owner of the ticket
module.exports.getComments = async (ticketId) => {
    try {
        const comments = await CommentModel.find({
            Ticket: ticketId
        });
        return comments;
    }catch(err){
        throw new Error("Error while getting comments");
    }
}

// TODO: Add validation to check if the user is the owner of the ticket
model.export.deleteComment = async (commentId) => {
    try {
        const comment = await CommentModel.findOne({
            _id: commentId
        });
        await comment.delete();
    }catch(err){
        throw new Error("Error while deleting comment");
    }
}

// TODO: Add validation to check if the user is the owner of the ticket
model.export.updateComment = async (commentId, message) => {
    try {
        const comment = await CommentModel.findOne({
            _id: commentId
        });
        comment.comment = message;
        await comment.save();
    }catch(err){
        throw new Error("Error while updating comment");
    }
}

