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
exports.del_simulation_value = exports.upd_simulation_value = exports.add_simulation_value = exports.get_simulation_value = void 0;
const database2_1 = require("../../data/database2");
const SimulationValueQ_1 = require("../../models/selfAwarness/qwertyModels/SimulationValueQ");
function get_simulation_value(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var mea_id = req.body.mea_id;
            var variable = req.body.variable;
            var value = new SimulationValueQ_1.SimulationValueQ(-1);
            value.isUsed = req.body.escenario;
            var rows = yield db.qwerty(value.toSqlSelect(["/@/METHOD/@/", "/@/VARIABLE/@/"], [mea_id, variable]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_simulation_value = get_simulation_value;
function add_simulation_value(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newValue = req.body;
            var value = new SimulationValueQ_1.SimulationValueQ(-1);
            value.isUsed = newValue.escenario;
            value.value = newValue.valor;
            yield db.qwerty(value.toSqlInsert(["/@/VARIABLE/@/"], [newValue.variable]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_simulation_value = add_simulation_value;
function upd_simulation_value(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newValue = req.body;
            var value = new SimulationValueQ_1.SimulationValueQ(newValue.valor);
            value.isUsed = newValue.escenario;
            yield db.qwerty(value.toSqlUpdate(["/@/VARIABLE/@/"], [newValue.variable]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.upd_simulation_value = upd_simulation_value;
function del_simulation_value(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newValue = req.body;
            var value = new SimulationValueQ_1.SimulationValueQ(newValue.valor);
            value.isUsed = newValue.escenario;
            yield db.qwerty(value.toSqlDelete(["/@/VARIABLE/@/"], [newValue.variable]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_simulation_value = del_simulation_value;
