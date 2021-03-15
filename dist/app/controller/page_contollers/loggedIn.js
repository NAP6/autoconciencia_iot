"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedIn = void 0;
function loggedIn(req, res, next) {
    if (req.session.user) {
        if (req.session.active_model) {
            next();
        }
        else {
            res.redirect("/start_session");
        }
    }
    else {
        res.redirect("/login");
    }
}
exports.loggedIn = loggedIn;
