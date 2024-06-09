/*require('./models/db');
const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser=require('./models/controllers/orderController');//C:\Users\Shazna\Desktop\web development project\EcoMart\models\controllers\orderController.js
//const bodyParser = require('body-parser');

var app=express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.jason());
app.use(express.static(path.join(_dirname,'/public')));
app.set('views',path.join(__dirname,'public'));
app.engine('hbs',exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: _dirname+'/views/'
}));
app.set('view engine','hbs');
app.listen(3000,()=>{
    console.log('Server on port: 3000');
});

app.use('/',orderController);

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


