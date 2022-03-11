// This file contains all crud logic of bookCategory 

const db = require("../models");
const Category = db.bookCategory;

// Logic for create
exports.create = (req, res) => {
    // Creating object
    const bookCat = {
        category: req.body.category,
        description: req.body.description,
    }
    // Pass object to create bookCategory 
    Category.create(bookCat).then(result => {
        res.status(201).send(result);
    }).catch(err => {
        res.status(500).send({message: `Server error occur at ${err}`})
    })
}

// logic for get all categories as well as with queries parameters
exports.findAll = (req, res) => {
    let promise;
    let category = req.query.category;
    if(category) {
        // logic to search category
        promise = Category.findAll({
            where: {category}
        })
    } else {
        promise = Category.findAll();
    }
    promise.then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({message: `Server error occur at ${err}`});
    })
}

// Logic to find category based on id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Category.findByPk(id).then(category => {
        res.status(200).send(category);
    }).catch(err => {
        res.status(500).send({message: `Server side error occur at ${err}`})
    })
}

// Logic for update BookCategory
exports.update = (req, res) => {
    // creating object
    const bookCat = {
        category: req. body.category,
        description: req.body.description,
    }
    const id = req.params.id;
    // pass object to update
    Category.update(bookCat, {
        where : {id},
        returning: true
    }).then( () => {
        // Returning the updated content
        Category.findByPk(id).then( category => {
            res.status(200).send(category);
        })
    }).catch( err => {
        res.status(500).send({message: `Server side error ${err}`});
    })
}

// Logic for delete
exports.delete = (req, res) => {
    const id = req.params.id;
    Category.destroy({
        where: {id}
    }).then(() =>  {
        res.status(202).send(`Category deleted successfully`);
    })
}