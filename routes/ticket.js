const TicketController = require('../controllers/ticket');

const ticketValidator = require('../validators/ticket');

const {Router} = require('express');

const ticketRouter = Router();

// Authorization middleware to check if user is logged in before processing request
const isAuthenticated = require('../middleware/auth');

ticketRouter.post('/create',isAuthenticated,
ticketValidator.validateTicketData(),
TicketController.postTicket);

ticketRouter.get('/get/:userId',isAuthenticated,
TicketController.getTickets);

ticketRouter.get('/get/:ticketId',isAuthenticated,
TicketController.getTicket);

ticketRouter.post('/comment',isAuthenticated,
ticketValidator.validateCommentData(),
TicketController.postComment);

ticketRouter.get('/comments/:ticketId',isAuthenticated,
TicketController.getComments);

ticketRouter.put('/comment/update',isAuthenticated,
ticketValidator.validateCommentData(),
TicketController.updateComment);

ticketRouter.delete('/comment/delete/:commentId',isAuthenticated,
TicketController.deleteComment);

module.exports = ticketRouter;