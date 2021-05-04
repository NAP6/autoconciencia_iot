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
exports.del_simulation_scenario = exports.upd_simulation_scenario = exports.add_simulation_scenario = exports.get_simulation_scenario = void 0;
const database2_1 = require("../../data/database2");
const SimulationScenarioQ_1 = require("../../models/selfAwarness/qwertyModels/SimulationScenarioQ");
function get_simulation_scenario(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var mea_id = req.body.mea_id;
            var escenario = new SimulationScenarioQ_1.SimulationScenarioQ(-1, "", "");
            var rows = yield db.qwerty(escenario.toSqlSelect(["/@/METHOD/@/"], [mea_id]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_simulation_scenario = get_simulation_scenario;
function add_simulation_scenario(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newEscenario = req.body;
            var escenario = new SimulationScenarioQ_1.SimulationScenarioQ(-1, newEscenario.name, newEscenario.description);
            escenario.active = escenario.active;
            yield db.qwerty(escenario.toSqlInsert(["/@/METHOD/@/"], [newEscenario.mea_id]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_simulation_scenario = add_simulation_scenario;
function upd_simulation_scenario(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newEscenario = req.body;
            var escenario = new SimulationScenarioQ_1.SimulationScenarioQ(newEscenario.id, newEscenario.name, newEscenario.description);
            escenario.active = newEscenario.active == 1;
            yield db.qwerty(escenario.toSqlUpdate([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.upd_simulation_scenario = upd_simulation_scenario;
function del_simulation_scenario(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newEscenario = req.body;
            var escenario = new SimulationScenarioQ_1.SimulationScenarioQ(newEscenario.id, "", "");
            yield db.qwerty(escenario.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_simulation_scenario = del_simulation_scenario;
