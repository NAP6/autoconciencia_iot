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
exports.del_metrics = exports.mod_metrics = exports.add_metrics_aspects = exports.add_metrics = exports.get_metrics_aspects = exports.get_metrics = exports.metrics = void 0;
const database2_1 = require("../../data/database2");
const MetricQ_1 = require("../../models/selfAwarness/qwertyModels/MetricQ");
function metrics(req, res) {
    res.render("metrics", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.metrics = metrics;
function get_metrics(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var metrics = new MetricQ_1.MetricQ(-1, "", "", "", "");
            var rows = yield db.qwerty(metrics.toSqlSelect([], []));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_metrics = get_metrics;
function get_metrics_aspects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var id = req.body.id;
            var metrics = new MetricQ_1.MetricQ(-1, "", "", "", "");
            var rows = yield db.qwerty(metrics.toSqlSelect(['/@/ASPECTID/@/'], []));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_metrics_aspects = get_metrics_aspects;
function add_metrics(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newMetric = req.body;
            var metric = new MetricQ_1.MetricQ(-1, newMetric.name, newMetric.description, newMetric.abbreviation, newMetric.perspective);
            metric.active = newMetric.active;
            yield db.qwerty(metric.toSqlInsert(["/@/TYPE/@/", "/@/ESCALE/@/", "/@/UNIT/@/"], [newMetric.type_metric, newMetric.scale, newMetric.unit]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_metrics = add_metrics;
function add_metrics_aspects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var element = req.body;
            for (var i = 0; i < element.length; i++) {
                var cont = yield db.qwerty(`SELECT COUNT(asp_me.met_id) cont FROM aspectoautoconsciencia_metrica as asp_me WHERE asp_me.aa_id=${element[i].aa_id} && asp_me.met_id=${element[i].met_id}`);
                cont = cont[0]["cont"];
                console.log(cont);
                if (cont > 0 && element[i].existe == '0') {
                    yield db.qwerty(`DELETE FROM aspectoautoconsciencia_metrica WHERE met_id=${element[i].met_id} AND aa_id=${element[i].aa_id}`);
                }
                else if (cont == 0 && element[i].existe == '1') {
                    yield db.qwerty(`INSERT INTO aspectoautoconsciencia_metrica(met_id, aa_id) VALUES (${element[i].met_id},${element[i].aa_id})`);
                }
            }
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_metrics_aspects = add_metrics_aspects;
function mod_metrics(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newMetric = req.body;
            var metric = new MetricQ_1.MetricQ(newMetric.id, newMetric.name, newMetric.description, newMetric.abbreviation, newMetric.perspective);
            metric.active = newMetric.active.toString();
            yield db.qwerty(metric.toSqlUpdate(["/@/TYPE/@/", "/@/ESCALE/@/", "/@/UNIT/@/"], [newMetric.type_metric, newMetric.scale, newMetric.unit]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.mod_metrics = mod_metrics;
function del_metrics(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newMetric = req.body;
            var metric = new MetricQ_1.MetricQ(newMetric.id, "", "", "", "");
            yield db.qwerty(metric.toSqlDelete(["", "", ""]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_metrics = del_metrics;
