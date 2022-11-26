const { Router } = require('express');


const authenticationController = require('../controllers/auth');
const CustomerValidator = require('../validators/customer');
const userRouter = Router();


userRouter.post('/edit',
CustomerValidator.validateEditCustomerData(),
authenticationController.editUser);

userRouter.post('/update-password',
CustomerValidator.validatePasswordData(),
authenticationController.updatePassword);

module.exports = userRouter;