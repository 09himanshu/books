// This file contain the logic of token verification

const jwt = require('jsonwebtoken');
const config = require('../config/server.config');
const db = require("../models");
const User = db.users;

// check valid token
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    // check token is provided or not
    if(!token) {
        return res.status(400).send({message:`No token provided`});
    }

    // check given token is valid or not
    jwt.verify(token,config.secret, (err, decodedToken) => {
        if(err) {
            return res.status(401).send({message: `Unauthorized`});
        }
        req.userId = decodedToken.id;
        next();
    } )

}

// check the person is admin or not

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then( user => {
        user.getRoles().then( roles => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            return res.status(403).send({message: `Require Admin Role !!!`});
        })
    }).catch(err => {
        res.status(500).send({message: `Error occur at server side ${err}`});
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authJwt;