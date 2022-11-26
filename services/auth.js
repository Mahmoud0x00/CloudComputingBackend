const bcrypt = require('bcrypt');

const UserModel = require('../models/User');

module.exports.registerCustomer = async (customerInfo) => {
    try { 

        const { name, email, password } = customerInfo;
        const hashedPassword = await bcrypt.hash(password, 12);

        const customer = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
            userType: 'customer',
            creationDate: Date.now(),
            UpdatedDate: Date.now()
        });

        await customer.save();
    }catch(err){
        throw new Error("Error while registering user");
    }
};

module.exports.doesCustomerExist = async (email) => {
    const customer = await UserModel.findOne({
            email: email
    });
    if(customer){
        return true;
    }else{
        return false;
    }
};

module.exports.editCustomerInfo = async (customerInfo) => {
    try { 
        const { userId, name, email } = customerInfo;

        const customer = await UserModel.findOne({
            _id: userId
        });

        if(customer){
            customer.name = name;
            customer.email = email;
            customer.UpdatedDate = Date.now();
            await customer.save();
        }else{
            throw new Error("User does not exist");
        }
    }catch(err){
        throw err.message;
    }
};

module.exports.updatePassword = async (passwordInfo) => {
    try { 
        const { userId, password } = passwordInfo;

        const customer = await UserModel.findOne({
            _id: userId
        });

        if(customer){
            const hashedPassword = await bcrypt.hash(password, 12);
            customer.password = hashedPassword;
            customer.UpdatedDate = Date.now();
            await customer.save();
        }else{
            throw new Error("User does not exist");
        }
    }catch(err){
        throw err.message;
    }
};