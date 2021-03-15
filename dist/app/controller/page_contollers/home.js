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
exports.home = exports.active_model = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
function active_model(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var model = new selfAwarnessModels_1.SelfAwarnessQ(-1, "", "", "", "");
        var rows = yield db.qwerty(model.toSqlSelect(["/@/MODEL/@/"], [req.body.select_model]));
        model = model.toObjectArray(rows);
        if (model.length > 0) {
            model = model[0];
            req.session.active_model = {
                nombre: model.name,
                descripcion: model.description,
                modelID: model.id,
            };
        }
        next();
    });
}
exports.active_model = active_model;
function home(req, res) {
    res.render("principal", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.home = home;
