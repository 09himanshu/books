//  This file contains all types sign up verification
const db = require('../models');
const User = db.users;
const Roles = db.Roles;

// Check email
const checkEmail = (req, res, next) => {
    User.findOne({
        where: { email: req.body.email}
    }).then(user => {
        if(user) {
            return res.status(400).send({message: `Email is already register`});
        }
        next();
    })
}

// check if the user is admin or not
const checkRoles = (req, res, next) => {
    if(req.body.roles) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if(!Roles.includes(req.body.roles[i])) {
                return res.status(400).send({ message: "Failed !, Roles doesn't exists"});
            }
        }
    }
    next();
}
const userValidation = {
    checkEmail,
    checkRoles
}

module.exports = userValidation;

