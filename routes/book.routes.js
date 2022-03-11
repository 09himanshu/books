/**
 * This file contain all routes of the api
 */

const controller = require('../controller/book.controller');
const {validate, authJwt} = require('../middleware');

module.exports = (app) =>{
    // Post route
    app.post('/addBook',[authJwt.verifyToken, authJwt.isAdmin,validate.bookValidator] ,controller.create);

    // Get all books
    app.get('/getAllBooks', controller.findAll);

    // Get book by id
    app.get('/getBookById/:id', controller.findOne);

    // Update books
    app.put('/updateBookById/:id', [authJwt.verifyToken, authJwt.isAdmin,validate.bookValidator], controller.update);

    // Delete books
    app.delete('/deleteBookById/:id', [authJwt.verifyToken, authJwt.isAdmin,validate.bookValidator], controller.delete);
}

