/*// Import required modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const orderController = require('./models/controllers/orderController'); // Import your controller
require('./models/db'); // Import the database connection

// Initialize Express application
const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure views and Handlebars engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.create({ 
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}).engine); // Set Handlebars engine with custom options

app.set('view engine', 'hbs'); // Set view engine to Handlebars

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});

// Routes
app.use('/', orderController); // Mount orderController at root path

// Export the Express app instance (if needed for testing or other purposes)
module.exports = app;
*/

require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
console.log(require('express-handlebars'));

const bodyParser = require('body-parser'); // Import bodyParser
const orderController = require('./models/controllers/orderController'); // Import orderController

var app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// Static files
app.use(express.static(path.join(__dirname, '/public')));

// Views and Handlebars engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.create({ // Use exphbs.create() method to create an instance
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/'
}).engine); // Use .engine property to pass the engine

app.set('view engine', 'hbs');

// Start server
app.listen(3000, () => {
    console.log('Server on port: 3000');
});

// Routes
app.use('/', orderController);


