const AuthenticationService = require('../services/auth');

const { validationResult } = require('express-validator');


module.exports.postUser = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        const { name, email, password } = req.body;
        const doesCustomerExist = await AuthenticationService.doesCustomerExist(email);
        if(doesCustomerExist){
            res.status(400).json({
                message: "User already exists"});
        }else{
            await AuthenticationService.registerCustomer({name, email, password});
            res.status(201).json({
                message: "User created successfully, please check your email for verification"});
        }
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }     
};