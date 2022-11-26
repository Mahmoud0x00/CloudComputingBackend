const TicketService = require('../services/ticket');

const ticketValidator = require('../validators/ticket');

const {Router} = require('express');

const ticketRouter = Router();


ticketRouter.post('/create',
ticketValidator.validateTicketData(),
TicketService.postTicket);

ticketRouter.get('/get/:userId',
TicketService.getTickets);

ticketRouter.get('/get/:ticketId',
TicketService.getTicket);

ticketRouter.post('/comment',
ticketValidator.validateCommentData(),
TicketService.postComment);

ticketRouter.get('/comments/:ticketId',
TicketService.getComments);

ticketRouter.post('/update',
ticketValidator.validateTicketData(),
TicketService.updateTicket);

ticketRouter.put('/comment/update',
ticketValidator.validateCommentData(),
TicketService.updateComment);

ticketRouter.delete('/comment/delete/:commentId',
TicketService.deleteComment);

module.exports = ticketRouter;