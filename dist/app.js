"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var app = express_1.default();
const multer_1 = __importDefault(require("multer"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const path_1 = require("path");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = require("body-parser");
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = __importDefault(require("./config/constants"));
const routes_1 = __importDefault(require("./config/routes"));
const api_1 = __importDefault(require("./config/api"));
var upload = multer_1.default({
    dest: 'uploads/'
});
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({
    extended: true
}));
/*************** Aqui ingresar la base de datos ********************/
//import {url} from './config/database.js';
//set up our express application
app.use(morgan_1.default('dev')); // log every request to the console
app.use(cookie_parser_1.default()); // read cookies (needed for auth)
app.use(body_parser_1.json()); // get information from html forms
app.use(body_parser_1.urlencoded()); // get information from html forms
//view engine setup
app.use(express_1.default.static(path_1.join(__dirname, 'public')));
app.set('views', path_1.join(__dirname, 'app/views'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express_session_1.default({
    secret: 'Autoconciencia',
    resave: true,
    saveUninitialized: true
}));
app.use(express_session_1.default()); // persistent login sessions
app.use(connect_flash_1.default()); // use connect-flash for flash messages stored in session
// routes ======================================================================
api_1.default(app); // load our api routes and pass in our app
routes_1.default(app, upload); // load our routes and pass in our app and Upload multer
//launch ======================================================================
app.listen(constants_1.default["server-port"], () => {
    console.log('Server listen at port ' + constants_1.default["server-port"]);
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
