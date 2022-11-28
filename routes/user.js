const { Router } = require('express');

const isAuthenticated = require('../middleware/auth');
const authenticationController = require('../controllers/auth');
const CustomerValidator = require('../validators/customer');
const userRouter = Router();


userRouter.post('/edit',isAuthenticated,
CustomerValidator.validateEditCustomerData(),
authenticationController.editUser);

userRouter.post('/update-password',isAuthenticated,
CustomerValidator.validatePasswordData(),
authenticationController.updatePassword);

module.exports = userRouter;