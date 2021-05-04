"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singup_save = exports.singup = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
function singup(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
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
function singup_save(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            res.redirect("/home");
        }
        else {
            if (req.body.inputPassword == req.body.inputPassword2) {
                var usert = new selfAwarnessModels_1.UserQ(-1, req.body.inputName, req.body.inputEmailAddress, req.body.inputPassword);
                var db = new database2_1.database2();
                yield db.qwerty(usert.toSqlInsert([], []));
                req.flash("succes", "Usuario creado correctamente");
                res.redirect("/login");
            }
            else {
                req.flash("error", "La claves ingresadas no conciden");
                res.redirect("/singup");
            }
        }
    });
}
exports.singup_save = singup_save;
