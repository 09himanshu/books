// This file contains bookCategory schema

module.exports = (sequelize,Sequelize) => {
    const bookCategory = sequelize.define('bookCategory', {
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description : {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return bookCategory;
}