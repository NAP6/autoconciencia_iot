import express from 'express';

var app = express();
import multer from 'multer';

import flash from 'connect-flash';
import { join } from 'path';

import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import session from 'express-session';

app.set('port', process.env.PORT || 3000);

var upload = multer({
    dest: 'uploads/'
})

app.use(json());
app.use(urlencoded({
    extended: true
}));


/*************** Aqui ingresar la base de datos ********************/
//import {url} from './config/database.js';



//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(json()); // get information from html forms
app.use(urlencoded()); // get information from html forms

//view engine setup
app.use(express.static(join(__dirname, 'public')));
app.set('views', join(__dirname, 'app/views'));
app.set('view engine', 'ejs'); // set up ejs for templating


app.use(session({
    secret: 'Autoconciencia',
    resave: true,
    saveUninitialized: true
}));

app.use(session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
//require('./config/routes.js')
import routes from './config/routes.js';
routes(app, upload); // load our routes and pass in our app and Upload multer
//launch ======================================================================
app.listen(app.get('port'), () => {
    console.log('Server listen at port ' + app.get('port'));
});

//catch 404 and forward to error handler
app.use(function (req, res) {
    res.render('404', {
        title: "Sorry, page not found",
        session: req.session
    });
});

app.use(function (_req, res) {
    res.status(500).render('404', {
        title: "Sorry, page not found"
    });
});

