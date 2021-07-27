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
exports.update_model = exports.models = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
function models(req, res) {
    res.render("models", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
        page: "models",
    });
}
exports.models = models;
function update_model(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var model = new selfAwarnessModels_1.SelfAwarnessQ(req.body.id_modelo_update, req.body.nombre_modelo_update, req.body.descripcion_ecenario_update, "", "");
        model.active = req.body.activoModelo != undefined;
        db.qwerty(model.toSqlUpdate([], []));
        res.render("models", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            session: req.session,
            page: "models",
        });
    });
}
exports.update_model = update_model;
