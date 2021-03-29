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
exports.del_scales = exports.upd_scales = exports.add_scales = exports.get_scales = exports.scales = void 0;
const database2_1 = require("../../data/database2");
const ScaleQ_1 = require("../../models/selfAwarness/qwertyModels/ScaleQ");
function scales(req, res) {
    res.render("scales", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.scales = scales;
function get_scales(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var scale = new ScaleQ_1.ScaleQ(-1, "", "", "");
            var rows = yield db.qwerty(scale.toSqlSelect([], []));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_scales = get_scales;
function add_scales(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newScale = req.body;
            var scale = new ScaleQ_1.ScaleQ(-1, newScale.name, newScale.valid_values, newScale.type);
            scale.active = scale.active;
            yield db.qwerty(scale.toSqlInsert([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_scales = add_scales;
function upd_scales(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newScale = req.body;
            var scale = new ScaleQ_1.ScaleQ(newScale.id, newScale.name, newScale.valid_values, newScale.type);
            scale.active = scale.active;
            yield db.qwerty(scale.toSqlUpdate([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.upd_scales = upd_scales;
function del_scales(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newScale = req.body;
            var scale = new ScaleQ_1.ScaleQ(newScale.id, "", "", "");
            yield db.qwerty(scale.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_scales = del_scales;
