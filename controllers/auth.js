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

module.exports.editUser = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        // TODO: replace userID with the actutal userID from JWT token
        const { userId,name, email } = req.body;
        const doesCustomerExist = await AuthenticationService.doesCustomerExist(email); 
        if(doesCustomerExist){
            res.status(400).json({
                message: "Email already exists"});
        }else{
            await AuthenticationService.editCustomerInfo({userId, name, email});
            res.status(201).json({
                message: "User edited successfully"});
        }
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }
};

module.exports.updatePassword = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        // TODO: replace userID with the actutal userID from JWT token
        const { userId, password } = req.body;
        await AuthenticationService.updatePassword({userId, password});
        res.status(201).json({
            message: "Password updated successfully"});
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }
};

module.exports.login = async (req, res) => {
    
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
        try {
            const { email, password } = req.body;
            
            const user = await AuthenticationService.checkCredentials(email, password);
            if(user){
                const token = await AuthenticationService.generateJWT(user);
                res.status(200).json({
                    message: "Login successful",
                    jwt: token
                });
            }else{
                res.status(401).json({
                    message: "Invalid credentials"
                });
            }
        } catch(err){
            res.status(500).send({
                error: "Error while checking credentials at login"
        });
    }
    }
};

