// this file contains all types signin signup routes

const controller = require('../controller/auth.controller');
const {validate, userValidation} = require("../middleware");

module.exports = (app) => {
    // signup routes
    app.post('/bookStore/api/v1/signup',[userValidation.checkEmail, userValidation.checkRoles] ,controller.signup);

    // signin routes
    app.post('/bookStore/api/v1/signin', controller.signin);
}