const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/server.config');
const db = require('./models');

const app = express();
app.use(bodyParser.json());


// Database
db.sequelize.sync({ force: true}).then(() => {
    console.log('Database connected');
    init();
}).catch(err => {
    console.log('Server error',err);
})

let Category = db.bookCategory;
let Roles = db.roles;
// The init dunction
function init() {
    let bookCategories = [
        {
            category: "Romance",
            description: "Any novel where the main storyline centers on a romantic relationship falls into this category, which has several subgenres",
        },
        {
            category: "Horror",
            description: "The goal of this genre is to scare your readers and keep them that way until the hero vanquishes the threat",
        },
        {
            category: "Fantasy",
            description: "The fantasy genre involves world-building and characters who are supernatural, mythological, magical, or a combination of these"
        }, 
        {
            category: "Thriller",
            description: "This genre also has scary elements, but its main objective is to keep your reader in a state of suspense until the story’s resolution."
        }
    ];
    Category.bulkCreate(bookCategories).then( () => {
        console.log(`BookCategory created`);
    }).catch(err => {
        console.log(`Server side error occur at bookCategory ${err}`);
    })
    
    // Creating roles
    Roles.create({
        id: 1,
        name: "customer"
    });
    Roles.create({
        id: 2,
        name: "admin"
    })
}


// Routes
require('./routes/book.routes')(app);
require('./routes/bookCategory.routes')(app);
require('./routes/auth.routes')(app);

// Port
app.listen(config.PORT, () => {
    console.log(`server started on port ${config.PORT}`);
})