// This file contain signup and signin authentication

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/server.config')
const User = db.users;
const Roles = db.roles;
const Op = db.Sequelize.Op;

// Handler for signup
exports.signup = (req, res) => {
    // creating user object
    const userObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        r_password: req.body.r_password
    }
    if(userObj.password !== userObj.r_password) {
        res.status(403).send({message: `password not match`});
    } else {
        userObj.password = bcrypt.hashSync(userObj.password, 8);
        userObj.r_password = bcrypt.hashSync(userObj.r_password, 8)
    }

    User.create(userObj).then(users => {
        if(req.body.roles) {
            Roles.findAll({
                where: {name: { [Op.or]: req.body.roles}}
            }).then(roles => {
                users.setRoles(roles).then(() => {
                    res.status(201).send({message: `User register successfully`})
                })

            })
        } else {
            users.setRoles([1]).then( () => {
                res.status(201).send({message: `User register successfully`})
            })
        }
    }).catch(err => {
        res.status(500).send({message: `Server error occur at signup ${err}`})
    }) 
}

// Handler for signin
exports.signin = (req, res) => {
    // find user based on ther email
    User.findOne({
        where: {email: req.body.email}
    }).then(user => {
        if(!user) {
            return res.status(404).send({message: `User not found`})
        }
        console.log(user.password);
        console.log(req.body.password);
        let isMatch = bcrypt.compareSync(req.body.password,user.password);
        if(!isMatch) {
            return res.status(401).send({message: `Invalid password`});
        }
        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 300
        });
        let authorities = [];
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                authorities.push('roles_'+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                roles: authorities,
                token: token
            })
        })
    }).catch(err => {
        res.status(500).send({message:`Server error occur at signin ${err}`});
        console.log(err);
    })
}