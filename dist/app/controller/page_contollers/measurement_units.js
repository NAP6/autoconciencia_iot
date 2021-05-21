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
exports.del_measurement_units = exports.upd_measurement_units = exports.add_measurement_units = exports.get_measurement_units = exports.measurement_units = void 0;
const database2_1 = require("../../data/database2");
const MeasurementUnitQ_1 = require("../../models/selfAwarness/qwertyModels/MeasurementUnitQ");
function measurement_units(req, res) {
    res.render("measurement_units", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.measurement_units = measurement_units;
function get_measurement_units(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var measurement = new MeasurementUnitQ_1.MeasurementUnitQ(-1, "", "", "");
            var rows = yield db.qwerty(measurement.toSqlSelect([], []));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_measurement_units = get_measurement_units;
function add_measurement_units(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newMeasurement = req.body;
            var measurement = new MeasurementUnitQ_1.MeasurementUnitQ(-1, newMeasurement.name, newMeasurement.description, newMeasurement.acronym);
            measurement.active = newMeasurement.active;
            yield db.qwerty(measurement.toSqlInsert([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_measurement_units = add_measurement_units;
function upd_measurement_units(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newMeasurement = req.body;
            var measurement = new MeasurementUnitQ_1.MeasurementUnitQ(newMeasurement.id, newMeasurement.name, newMeasurement.description, newMeasurement.acronym);
            measurement.active = newMeasurement.active;
            yield db.qwerty(measurement.toSqlUpdate([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.upd_measurement_units = upd_measurement_units;
function del_measurement_units(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newMeasurement = req.body;
            var measurement = new MeasurementUnitQ_1.MeasurementUnitQ(newMeasurement.id, "", "", "");
            yield db.qwerty(measurement.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_measurement_units = del_measurement_units;
