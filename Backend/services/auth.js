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