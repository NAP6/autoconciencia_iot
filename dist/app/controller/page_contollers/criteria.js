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
exports.del_criteria = exports.upd_criteria = exports.add_criteria = exports.get_criteria = exports.criteria = void 0;
const database2_1 = require("../../data/database2");
const DecisionCriteriaQ_1 = require("../../models/selfAwarness/qwertyModels/DecisionCriteriaQ");
function criteria(req, res) {
    res.render("decision_criteria", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.criteria = criteria;
function get_criteria(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var criteria = new DecisionCriteriaQ_1.DecisionCriteriaQ(-1, "", "");
            var rows = yield db.qwerty(criteria.toSqlSelect([], []));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_criteria = get_criteria;
function add_criteria(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newCriteria = req.body;
            var criteria = new DecisionCriteriaQ_1.DecisionCriteriaQ(-1, newCriteria.name, newCriteria.description);
            criteria.active = criteria.active;
            yield db.qwerty(criteria.toSqlInsert([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_criteria = add_criteria;
function upd_criteria(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newCriteria = req.body;
            var criteria = new DecisionCriteriaQ_1.DecisionCriteriaQ(newCriteria.id, newCriteria.name, newCriteria.description);
            criteria.active = criteria.active;
            yield db.qwerty(criteria.toSqlUpdate([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.upd_criteria = upd_criteria;
function del_criteria(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newCriteria = req.body;
            var criteria = new DecisionCriteriaQ_1.DecisionCriteriaQ(newCriteria.id, "", "");
            yield db.qwerty(criteria.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_criteria = del_criteria;
