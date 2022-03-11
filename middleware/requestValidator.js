// This file contains all types of validation for books and bookCetagories

const db = require('../models')
const Category = db.bookCategory;

const bookValidator = (req, res, next) => {
    // check for title
    if(!req.body.title) {
        return res.status(400).send({message: `Book title is not provided`})
    }

    // check for author
    if(!req.body.author) {
        return res.status(400).send({message: `Book author is not privided`});
    }

    // check for publisher
    if(!req.body.publisher) {
        return res.status(400).send({message: `Publisher of the book is not provided`});
    }

    // check for price
    if(!req.body.price ||req.body.price) {
        if(req.body.price <= 0) {
            return res.status(400).send({message: `Invalid price tag is provided check it!!!`})
        }
    } 

    // check for bookCategory it is valid or not
    if(req.body.bookCategoryId) {
        Category.findByPk(req.body.bookCategoryId).then( category => {
            if(!category) {
                return res.status(400).send({message: `bookCategory is not valid`})
            }
            next();
        })
    } else {
        return res.status(400).send({message: `bookCategoryId is not provided`});
    }
}

// validation for category
const categoryValidation = (req, res,next) => {
    // check for category
    if(!req.body.category) {
        return res.status(400).send({message: `Category is not provided`});
    }

    // check for description
    if(!req.body.description) {
        return res.status(400).send({message: `Category description is not provided`});
    }

    next();
}

const validate = {
    bookValidator:  bookValidator, 
    categoryValidation
}

module.exports = validate;