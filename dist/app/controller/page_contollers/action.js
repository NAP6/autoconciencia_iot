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
exports.del_action = exports.upd_action = exports.add_action = exports.get_action = void 0;
const database2_1 = require("../../data/database2");
const ActionQ_1 = require("../../models/selfAwarness/qwertyModels/ActionQ");
function get_action(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var metodo = req.body.mea_id;
            console.log(metodo);
            var action = new ActionQ_1.ActionQ(-1, "");
            action.isRecommendedln = req.body.umbral;
            var rows = yield db.qwerty(action.toSqlSelect(["/@/METHOD/@/"], [metodo]));
            res.json({ umbral_id: req.body.umbral, acciones: rows });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_action = get_action;
function add_action(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAction = req.body;
            var action = new ActionQ_1.ActionQ(-1, newAction.description);
            action.active = action.active;
            action.isRecommendedln = newAction.umbral;
            yield db.qwerty(action.toSqlInsert(["/@/METHOD/@/"], [newAction.mea_id]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_action = add_action;
function upd_action(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAction = req.body;
            var action = new ActionQ_1.ActionQ(newAction.id, newAction.description);
            action.active = newAction.active == 1;
            yield db.qwerty(action.toSqlUpdate([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.upd_action = upd_action;
function del_action(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAction = req.body;
            var action = new ActionQ_1.ActionQ(newAction.id, "");
            yield db.qwerty(action.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_action = del_action;
