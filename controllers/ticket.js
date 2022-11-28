const TicketService = require('../services/ticket');

const { validationResult } = require('express-validator');

module.exports.postTicket = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        // TODO: replace userID with the actutal userID from JWT token
        const { userId, title, description } = req.body;
        await TicketService.createTicket({title, description, status: "Open", Owner: userId});
        res.status(201).json({
            message: "Ticket created successfully"});
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }
};

module.exports.getTickets = async (req, res) => {
    try {
        // TODO: replace userID with the actutal userID from JWT token
        const userId = req.params.userId;
        const tickets = await TicketService.getTickets(userId);
        res.status(200).json({
            tickets: tickets
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.getTicket = async (req, res) => {
    try {
        // TODO Authorize user to see if he is the owner of the ticket
        const ticketId = req.params.ticketId;
        const ticket = await TicketService.getTicket(ticketId);
        res.status(200).json({
            ticket: ticket
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.postComment = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        // TODO: replace userID with the actutal userID from JWT token
        const { userId, ticketId, message } = req.body;
        await TicketService.AddComment({message, Owner: userId, Ticket: ticketId});
        res.status(201).json({
            message: "Comment added successfully"});
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }
}

module.exports.getComments = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const comments = await TicketService.getComments(ticketId);
        res.status(200).json({
            comments: comments
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        await TicketService.deleteComment(commentId);
        res.status(200).json({
            message: "Comment deleted successfully"
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.updateComment = async (req,res) => {
    const errors = validationResult(req).array;
    
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try{

        const { newMessage, commentId }  = req.params;
        await TicketService.updateComment(commentId,newMessage);
        res.status(200).json({
            message: "Comment updated Succesfully"
        });

    }catch(error){
        res.status(500).send({
            error: error.message
        });
    }
}
}
