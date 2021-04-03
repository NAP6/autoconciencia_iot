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
exports.del_umbral = exports.upd_umbral = exports.add_umbral = exports.get_umbral = void 0;
const database2_1 = require("../../data/database2");
const ThresholdQ_1 = require("../../models/selfAwarness/qwertyModels/ThresholdQ");
function get_umbral(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var criteria = req.body;
            var umbral = new ThresholdQ_1.ThresholdQ(-1, "", "", -1, -1);
            var rows = yield db.qwerty(umbral.toSqlSelect(['/@/CRITERIA/@/'], [criteria.criterio]));
            res.json({ id_descicion: criteria.criterio, umbrales: rows });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_umbral = get_umbral;
function add_umbral(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newUmbral = req.body;
            var umbral = new ThresholdQ_1.ThresholdQ(-1, newUmbral.name, newUmbral.interpretacion, newUmbral.inferior, newUmbral.superior);
            umbral.active = umbral.active;
            yield db.qwerty(umbral.toSqlInsert(['/@/CRITERIA/@/'], [newUmbral.criterio]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_umbral = add_umbral;
function upd_umbral(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newUmbral = req.body;
            var umbral = new ThresholdQ_1.ThresholdQ(newUmbral.id, newUmbral.name, newUmbral.interpretacion, newUmbral.inferior, newUmbral.superior);
            umbral.active = newUmbral.active;
            yield db.qwerty(umbral.toSqlUpdate([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.upd_umbral = upd_umbral;
function del_umbral(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newUmbral = req.body;
            var umbral = new ThresholdQ_1.ThresholdQ(newUmbral.id, "", "", -1, -1);
            yield db.qwerty(umbral.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_umbral = del_umbral;
