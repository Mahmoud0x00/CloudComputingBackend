const { check } = require('express-validator');

module.exports.validateCustomerData = () => {
    const validationMiddlewares = [
        check('name').notEmpty().withMessage('Name cannot be empty'),
        check('email').isEmail().withMessage('Email is not valid'),
        check('password').notEmpty().withMessage('Password cannot be empty')
    ];
    return validationMiddlewares;
} 