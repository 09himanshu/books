// This file contain all logic of crud operation

const db = require("../models");
const Book = db.books;

// Logic for create
exports.create = (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        publisher: req.body.publisher,
        price: req.body.price,
        bookCategoryId : req.body.bookCategoryId,
    }
    Book.create(book).then(books => {
        res.status(201).send(books);
    }).catch(err => {
        res.status(500).send({message: `Error occur at server side ${err}`});
    })

}

// Logic fro find all books as well as with title, author,publisher
exports.findAll = (req, res) => {
    let promise;
    let title = req.query.title;
    let author = req.query.author;
    let publisher = req.query.publisher;

    if(title) {
        promise = Book.findAll({ 
            where: {title}
        })
    } else if(author) {
        promise = Book.findAll({
            where: {author}
        })
    } else if (publisher) {
        promise = Book.findAll({
            where: {publisher}
        })
    } else {
        promise = Book.findAll();
    }

    promise.then( books => {
        res.status(200).send(books)
    }).catch(err => {
        res.status(500).send({message: `Error occur at server side ${err}`});
    })
}

// Logic for find book based on id
exports.findOne = (req, res) => {
    const bookId = req.params.id;
    Book.findByPk(bookId).then(books => {
        res.status(200).send(books);
    }).catch(err => {
        res.status(500).send({message: `Error occur at server side ${err}`});
    });
}

// Logic for update books
exports.update = (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        publisher: req.body.publisher,
        price: req.body.price,
    }
    const bookId = req.params.id;
    Book.update(book, {
        where: {id : bookId},
        returning: true,
    }).then( () => {
        Book.findByPk(bookId).then(book => {
            res.status(200).send(book);
        })
    }).catch( err => {
        res.status(500).send({message: `Error occur at server side ${err}`})
    })
}

// Logic for delete a book
exports.delete = (req, res) => {
    const bookId = req.params.id;
    Book.destroy({
        where: { id : bookId}
    }).then(() => {
        res.status(202).send(`Book deleted successfully`);
    })
}