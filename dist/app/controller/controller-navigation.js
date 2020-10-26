"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save_new_model = exports.generate_model = exports.functions = exports.formulas = exports.decision = exports.scales = exports.measurement_units = exports.object = exports.subject = exports.models = exports.home = exports.singup_save = exports.singup = exports.login = exports.loggedIn = void 0;
function loggedIn(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect("/login");
    }
}
exports.loggedIn = loggedIn;
function login(req, res) {
    if (req.session.user) {
        res.redirect("/home");
    }
    else {
        res.render("login", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            session: req.session,
        });
    }
}
exports.login = login;
function singup(req, res) {
    if (req.session.user) {
        res.redirect("/home");
    }
    else {
        res.render("singup", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            session: req.session,
        });
    }
}
exports.singup = singup;
function singup_save(req, res, next) {
    if (req.session.user) {
        //Guardar
        next();
    }
    else {
        res.redirect("/login");
    }
}
exports.singup_save = singup_save;
function home(req, res) {
    res.render("home", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.home = home;
function models(req, res) {
    res.render("models", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.models = models;
function subject(req, res) {
    res.render("subject", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.subject = subject;
function object(req, res) {
    res.render("object", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.object = object;
function measurement_units(req, res) {
    res.render("measurement_units", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.measurement_units = measurement_units;
function scales(req, res) {
    res.render("scales", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.scales = scales;
function decision(req, res) {
    res.render("decision", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.decision = decision;
function formulas(req, res) {
    res.render("formulas", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.formulas = formulas;
function functions(req, res) {
    res.render("functions", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.functions = functions;
function generate_model(req, res) {
    res.render("generate_model", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.generate_model = generate_model;
function save_new_model(req, res, next) {
    if (req.session.user) {
        // Guardar
        next();
    }
    else {
        res.redirect("/login");
    }
}
exports.save_new_model = save_new_model;
