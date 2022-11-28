
const jwt = require('jsonwebtoken');

const userModel = require('../models/User');

const isAuthenticated = async (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send({
            error: "You should be logged in to access this resource"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);
        if(user){
            req.user = user;
            next();
        }else{
            res.status(401).send({
                error: "Invalid token"
            });
        }
    } catch(err){
        res.status(401).send({
            error: "Invalid token"
        });
    }
}

module.exports = isAuthenticated;