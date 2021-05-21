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
exports.get_last_insert_process = exports.get_pre_reflective_process_mod = exports.del_pre_reflective_process = exports.mod_pre_reflective_process = exports.add_pre_reflective_process = exports.get_pre_reflective_process = exports.add_metodo_modelo = exports.pre_reflective_process = void 0;
const database2_1 = require("../../data/database2");
const PreReflectiveProcessQ_1 = require("../../models/selfAwarness/qwertyModels/PreReflectiveProcessQ");
const Indicator_1 = require("../../models/selfAwarness/Indicator");
const Property_1 = require("../../models/selfAwarness/Property");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
const DataFlow_1 = require("../../models/selfAwarness/DataFlow");
const DirectMetric_1 = require("../../models/selfAwarness/DirectMetric");
function pre_reflective_process(req, res) {
    res.render("proceso_pre_reflexivo", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.pre_reflective_process = pre_reflective_process;
function add_metodo_modelo(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var data = req.body;
            console.log(data);
            var db = new database2_1.database2();
            var modeloID = req.session.active_model.modelID;
            var coll = new selfAwarnessModels_1.CollectionMethodQ(-1, "");
            coll.produces = new DirectMetric_1.DirectMetric(data.m_recoleccion.met_id, "", "", "", "");
            coll.isSupported = new DataFlow_1.DataFlow(data.m_recoleccion.flu_id, "", "", data.m_recoleccion.mr_tipo, "");
            coll.collectsProperty = [new Property_1.Property(data.m_recoleccion.pro_id, "")];
            var row1 = yield db.qwerty(coll.toSqlInsert(["/@/PROCES/@/", "/@/MODEL/@/", "/@/OBJECT/@/"], [data.proceso_id, modeloID, data.m_recoleccion.obj_id]));
            var anali = new selfAwarnessModels_1.AnalysisModelQ(-1, data.m_modelo.ma_tipo);
            anali.produces = new Indicator_1.Indicator(data.m_modelo.met_id, "", "", "", "");
            var row2 = yield db.qwerty(anali.toSqlInsert(["/@/PROCES/@/", "/@/CRITERIA/@/"], [data.proceso_id, data.m_modelo.criterio_id]));
            var resp = [row1[0][0].id, row2[0][0].id];
            console.log(resp);
            res.json(resp);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_metodo_modelo = add_metodo_modelo;
function get_pre_reflective_process(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modeloID = req.session.active_model.modelID;
            var pre_process;
            pre_process = new PreReflectiveProcessQ_1.PreReflectiveProcessQ(-1, "", "", -1);
            var rows = yield db.qwerty(pre_process.toSqlSelect(["/@/MODEL/@/"], [modeloID]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_pre_reflective_process = get_pre_reflective_process;
function add_pre_reflective_process(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newProcess = req.body;
            var tipo_proceso = 17;
            var modeloID = req.session.active_model.modelID;
            var process = new PreReflectiveProcessQ_1.PreReflectiveProcessQ(-1, newProcess.nombre, newProcess.descripcion, tipo_proceso);
            if (newProcess.inicioP) {
                process.executionPeriodStart = newProcess.inicioP;
            }
            if (newProcess.finP) {
                process.executionPeriodEnd = newProcess.finP;
            }
            process.active = newProcess.active;
            var rows = yield db.qwerty(process.toSqlInsert(["/@/ASPECTID/@/", "/@/SUBJECT/@/", "/@/MODEL/@/"], [newProcess.aspId, newProcess.sujId, modeloID]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_pre_reflective_process = add_pre_reflective_process;
function mod_pre_reflective_process(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newProcess = req.body;
            var process = new PreReflectiveProcessQ_1.PreReflectiveProcessQ(newProcess.id, newProcess.name, newProcess.description, newProcess.type);
            if (newProcess.inicioP) {
                process.executionPeriodStart = newProcess.inicioP;
            }
            if (newProcess.finP) {
                process.executionPeriodEnd = newProcess.finP;
            }
            yield db.qwerty(process.toSqlUpdate([], []));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.mod_pre_reflective_process = mod_pre_reflective_process;
function del_pre_reflective_process(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newProcess = req.body;
            var process_pre = new PreReflectiveProcessQ_1.PreReflectiveProcessQ(newProcess.id, "", "", -1);
            yield db.qwerty(process_pre.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_pre_reflective_process = del_pre_reflective_process;
function get_pre_reflective_process_mod(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var id = req.body.proceso_seleccionado;
            var rows = yield db.qwerty(`SELECT 
		  pa.pa_id as id,
		  pa.pa_nombre as nombre, 
		  pa.pa_descripcion as descripcion, 
		  DATE_FORMAT(pa.pa_inicio_periodo_ejecucion,"%Y-%m-%d") as inicio, 
		  DATE_FORMAT(pa.pa_fin_periodo_ejecucion,"%Y-%m-%d") as fin,
		  pa.aa_id as aspecto,
		  pa.suj_id as sujeto,
		  suj.suj_nombre as sujeto_nombre
		  FROM
		  sujeto suj,
		  procesoautoconsciencia pa
		  WHERE pa_id=${id} AND pa.suj_id=suj.suj_id`);
            res.render("modificar_pre_reflexivos", {
                error: req.flash("error"),
                succes: req.flash("succes"),
                modificar: rows,
                session: req.session,
            });
            console.log(rows[0]);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_pre_reflective_process_mod = get_pre_reflective_process_mod;
function get_last_insert_process(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var rows = yield db.qwerty(`SELECT MAX(pa_id) as id FROM procesoautoconsciencia`);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_last_insert_process = get_last_insert_process;
