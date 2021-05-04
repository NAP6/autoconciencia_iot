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
exports.del_simulation_variable = exports.upd_simulation_variable = exports.add_simulation_variable = exports.get_simulation_variable = void 0;
const database2_1 = require("../../data/database2");
const SimulationVariableQ_1 = require("../../models/selfAwarness/qwertyModels/SimulationVariableQ");
function get_simulation_variable(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var mea_id = req.body.mea_id;
            var variable = new SimulationVariableQ_1.SimulationVariableQ(-1, "");
            var rows = yield db.qwerty(variable.toSqlSelect(["/@/METHOD/@/"], [mea_id]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_simulation_variable = get_simulation_variable;
function add_simulation_variable(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newVariable = req.body;
            var variable = new SimulationVariableQ_1.SimulationVariableQ(-1, newVariable.name);
            variable.active = variable.active;
            yield db.qwerty(variable.toSqlInsert(["/@/METHOD/@/"], [newVariable.mea_id]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_simulation_variable = add_simulation_variable;
function upd_simulation_variable(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newVariable = req.body;
            var variable = new SimulationVariableQ_1.SimulationVariableQ(newVariable.id, newVariable.name);
            variable.active = newVariable.active == 1;
            yield db.qwerty(variable.toSqlUpdate([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.upd_simulation_variable = upd_simulation_variable;
function del_simulation_variable(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newVariable = req.body;
            var variable = new SimulationVariableQ_1.SimulationVariableQ(newVariable.id, "");
            yield db.qwerty(variable.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_simulation_variable = del_simulation_variable;
