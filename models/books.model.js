/**
 * this file contain the schema of books 
 */

module.exports = (sequelize, Sequelize) => {
    const Books = sequelize.define('book', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        releaseDate : {
            type: Sequelize.STRING,
            allowNull: false,
        },
        publisher: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    })

    return Books;
}
// id, title, author and release date and publisher.