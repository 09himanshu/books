// This file conatins all bookCategory

const controller = require('../controller/bookCategory.controller');
const {validate, authJwt} = require("../middleware");

module.exports = (app) =>{
    // Route for creating
    app.post('/bookStore/api/v1/bookCategory', [authJwt.verifyToken, authJwt.isAdmin, validate.categoryValidation], controller.create);

    // Routes to find all category as well as with query parameters
    app.get('/bookStore/api/v1/bookCategory',controller.findAll);

    // Routes to find category based on id
    app.get('/bookStore/api/v1/bookCategory/:id', controller.findOne);

    // Routes to update the category
    app.put('/bookStore/api/v1/bookCategory/:id', [authJwt.verifyToken, authJwt.isAdmin, validate.categoryValidation] ,controller.update);

    // Routes for deleting
    app.delete('/bookStore/api/v1/bookCategory/:id', [authJwt.verifyToken, authJwt.isAdmin, validate.categoryValidation] , controller.delete);
}