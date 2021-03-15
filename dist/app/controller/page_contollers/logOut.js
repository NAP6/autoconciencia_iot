"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
function logout(req, res, next) {
    var _a, _b;
    (_a = req.session) === null || _a === void 0 ? true : delete _a.user;
    (_b = req.session) === null || _b === void 0 ? true : delete _b.active_model;
    res.redirect("/login");
}
exports.logout = logout;
