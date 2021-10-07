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
exports.get_reflective_process_mod = exports.add_metodo_modelo2 = exports.del_reflective_process = exports.add_reflective_process = exports.get_reflective_process = exports.reflective_process = void 0;
const database2_1 = require("../../data/database2");
const Indicator_1 = require("../../models/selfAwarness/Indicator");
const IndirectMetric_1 = require("../../models/selfAwarness/IndirectMetric");
const ReflectiveProcessQ_1 = require("../../models/selfAwarness/qwertyModels/ReflectiveProcessQ");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
function reflective_process(req, res) {
    res.render("procesos_reflexivos", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.reflective_process = reflective_process;
function get_reflective_process(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modeloID = req.session.active_model.modelID;
            var process_reflec = new ReflectiveProcessQ_1.ReflectiveProcessQ(-1, "", "", -1);
            var rows = yield db.qwerty(process_reflec.toSqlSelect(["/@/MODEL/@/"], [modeloID]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_reflective_process = get_reflective_process;
function add_reflective_process(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newProcess = req.body;
            var tipo_proceso = 18;
            var modeloID = req.session.active_model.modelID;
            var process = new ReflectiveProcessQ_1.ReflectiveProcessQ(-1, newProcess.nombre, newProcess.descripcion, tipo_proceso);
            if (newProcess.inicioP) {
                process.executionPeriodStart = newProcess.inicioP;
            }
            if (newProcess.finP) {
                process.executionPeriodEnd = newProcess.finP;
            }
            if (newProcess.intervaloE) {
                process.executionTimeInterval = newProcess.intervaloE;
            }
            if (newProcess.tipoE) {
                process.executionType = newProcess.tipoE;
            }
            if (newProcess.horaE) {
                process.executionTime = newProcess.horaE;
            }
            process.active = true;
            var rows = yield db.qwerty(process.toSqlInsert(["/@/ASPECTID/@/", "/@/SUBJECT/@/", "/@/MODEL/@/", "/@/HORA/@/"], [newProcess.aspId, newProcess.sujId, modeloID, newProcess.unidadT]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_reflective_process = add_reflective_process;
function del_reflective_process(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newProcess = req.body;
            var process_pre = new ReflectiveProcessQ_1.ReflectiveProcessQ(newProcess.id, "", "", -1);
            yield db.qwerty(process_pre.toSqlDelete([]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_reflective_process = del_reflective_process;
function add_metodo_modelo2(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var data = req.body;
            var db = new database2_1.database2();
            var modeloID = req.session.active_model.modelID;
            var calc = new selfAwarnessModels_1.CalculationMethodQ(-1, "");
            calc.produces = new IndirectMetric_1.IndirectMetric(data.m_calculo.met_id, "", "", "");
            calc.implementationResourceType = data.m_calculo.ma_tipo;
            calc.calculationPeriodStart = data.m_calculo.inicio;
            calc.calculationPeriodEnd = data.m_calculo.fin;
            var row1 = yield db.qwerty(calc.toSqlInsert(["/@/PROCES/@/"], [data.proceso_id]));
            var anali = new selfAwarnessModels_1.AnalysisModelQ(-1, data.modelo.ma_tipo);
            anali.produces = new Indicator_1.Indicator(data.modelo.met_id, "", "", "", "");
            var row2 = yield db.qwerty(anali.toSqlInsert(["/@/PROCES/@/", "/@/CRITERIA/@/"], [data.proceso_id, data.modelo.criterio_id]));
            res.json([row1[0][0].id, row2[0][0].id]);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_metodo_modelo2 = add_metodo_modelo2;
function get_reflective_process_mod(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var id = req.body.proceso_reflexivo_seleccionado;
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
            res.render("modificar_reflexivos", {
                error: req.flash("error"),
                succes: req.flash("succes"),
                modificar: rows,
                session: req.session,
            });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_reflective_process_mod = get_reflective_process_mod;
