"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
function login(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        res.redirect("/home");
        req.flash("error");
        req.flash("succes");
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
