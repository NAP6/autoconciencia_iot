"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = exports.entity = exports.system = void 0;
const handling_json_1 = require("../models/handling-json");
function system(req, res) {
    if (req.session.user) {
        res.redirect("/");
    }
    else {
        var js = new handling_json_1.json();
        // Cargar json de la base de datos
        res.json(js.getSystem());
    }
}
exports.system = system;
function entity(req, res) {
    if (req.session.user) {
        res.redirect("/");
    }
    else {
        var js = new handling_json_1.json();
        // Cargar json de la base de datos
        res.json(js.getEntity());
    }
}
exports.entity = entity;
function home(req, res) {
    if (req.session.user) {
        res.redirect("/");
    }
    else {
        res.send('Home Api');
    }
}
exports.home = home;
