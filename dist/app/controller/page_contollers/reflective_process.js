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
            if (data.m_calculo.inicio == "") {
                data.m_calculo.inicio = undefined;
            }
            if (data.m_calculo.fin == "") {
                data.m_calculo.fin = undefined;
            }
            if (data.m_calculo.intervalo == "") {
                data.m_calculo.intervalo = undefined;
            }
            calc.calculationPeriodStart = data.m_calculo.inicio;
            calc.calculationPeriodEnd = data.m_calculo.fin;
            calc.intervalo = data.m_calculo.intervalo;
            calc.unidad = data.m_calculo.unidad;
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
            var modeloID = req.session.active_model.modelID;
            var sql = `SELECT
	                    pa.pa_id as id,
		                    pa.pa_nombre as nombre,
		                    pa.pa_descripcion as descripcion,
		                    pa.pa_tipo,
		                    DATE_FORMAT(pa.pa_inicio_periodo_ejecucion,"%Y-%m-%d") as inicio,
		                    DATE_FORMAT(pa.pa_fin_periodo_ejecucion,"%Y-%m-%d") as fin,
		                    pa.aa_id as aspecto,
		                    asp.aa_nombre as aspecto_nombre,
				    asp.aa_alcance as alcance,
		                    pa.suj_id as sujeto,
		                    suj.suj_nombre as sujeto_nombre,
		                    pa_tipo_ejecucion,
		                    enu.enu_nombre_valor as tipo_ejecucion,
		                    pa_unidad_tiempo,
		                    enu2.enu_nombre_valor as unidad_tiempo,
		                    pa_intervalo_ejecucion,
		                    pa_hora_ejecucion,
				     obj.obj_padre as padre_objeto,
				     obj.obj_tipo as categoria,
				     obj.obj_nombre as nombre_objeto
	                    FROM
	                    procesoautoconsciencia pa,
		                    aspectoautoconsciencia asp,
		                    sujeto suj,
				    aspectoautoconsciencia_objeto asp_obj,
				    objeto obj,
		                    enumeracion enu,
		                    enumeracion enu2
	                    WHERE pa_id=${id} AND 
	                    pa.ma_id=${modeloID} AND 
	                    pa.aa_id=asp.aa_id AND 
	                    pa.ma_id=asp.ma_id AND 
			    pa.suj_id=suj.suj_id AND 
			    suj.ma_id=pa.ma_id AND 
			    pa.pa_tipo_ejecucion=enu.enu_id AND 
	  		    pa.pa_unidad_tiempo=enu2.enu_id AND
	  		    asp_obj.ma_id=pa.ma_id AND
	  		    asp_obj.aa_id=asp.aa_id AND
			    obj.ma_id=pa.ma_id AND
	  	            obj.obj_id = asp_obj.obj_id`;
            var rows_general = yield db.qwerty(sql);
            var sql_aprendizaje_razonamiento = `select *
		  from
	  	(select mtl.mea_id as id_recoleccion,
			    mtl.mea_tipo as tipo_metodo,
			    mtl.pa_id as proceso_id,
			    mtl.met_id as metrica_metodo,
			    mt.met_nombre as metrica_metodo_nombre,
			    DATE_FORMAT(metc.mc_inicio_periodo_calculo,"%Y-%m-%d") as inicio,
		            DATE_FORMAT(metc.mc_fin_periodo_calculo,"%Y-%m-%d") as fin,
			    metc.mc_unidad_tiempo as unidad,
			    enu.enu_nombre_valor as unidadT,
			    metc.mc_intervalo as intervalo,
			    metc.mc_tipo_recurso as tipo_recurso_metodo
					from metodoaprendizajerazonamiento mtl
					inner join metodocalculo metc
					on mtl.mea_id=metc.mea_id 
			        inner join metrica mt on mt.met_id=mtl.met_id inner join enumeracion enu on metc.mc_unidad_tiempo=enu.enu_id) ta_1,
					(select mtl.pa_id as proceso_id_2,
					    mtl.met_id as metrica_modelo,
					        met.met_nombre as metrica_modelo_nombre,
						ana.ma_tipo_recurso as tipo_recurso,
						ana.cd_id as criterio_id,
						cri.cd_nombre as criterio_nombre,
						mtl.mea_id as id_modelo
					from 
					metodoaprendizajerazonamiento mtl
					inner join modeloanalisis ana on mtl.mea_id=ana.mea_id
					inner join criteriodecision cri on cri.cd_id=ana.cd_id
					inner join metrica met on met.met_id=mtl.met_id) ta_2
					where
					ta_1.proceso_id=${rows_general[0].id} and
	  				ta_1.proceso_id=ta_2.proceso_id_2`;
            var rows_aprendizaje_razonamiento = yield db.qwerty(sql_aprendizaje_razonamiento);
            var row_param_rec = [];
            if (rows_aprendizaje_razonamiento.length > 0) {
                var sql_parametros_recursos = `
		      		select 
		      		ri.ri_id as ri_id,
			      		ri.ri_nombre as nombre_recurso,
			      		ri.ri_descripcion as descripcion_recurso,
			      		enu2.enu_nombre_valor as tipo_salida_recurso,
			      		par.par_nombre as nombre_parametro,
			      		enu1.enu_nombre_valor as tipo_parametro,
			      		par.par_opcional as opcional_parametro,
			      		enu3.enu_nombre_valor as metrica_tipo,
			      		met.met_nombre as nombre_metrica,
			      		pa.pa_nombre as proceso,
					pa.pa_descripcion as proceso2,
			      		var.vs_nombre as variable,
			      		dat.data_name as metadata
		      	    from
		      		modeloanalisis ana 
		      		inner join mapeoparametros map on ana.mea_id=map.mea_id
		      		inner join parametro par on map.par_ordinal=par.par_id
		      		inner join recursoimplementacion ri on par.ri_id=ri.ri_id
		      		left join metrica met on map.met_id=met.met_id
		      		left join variablesimulacion var on map.vs_id=var.vs_id
		      		inner join enumeracion enu1 on par.par_tipo_dato=enu1.enu_id
		      		inner join enumeracion enu2 on ri.ri_tipo_dato_salida=enu2.enu_id
		      		inner join enumeracion enu3 on met.met_tipo=enu3.enu_id 
		      		left join procesoautoconsciencia pa on pa.pa_id=map.pa_id
		      		left join data_column dat on dat.data_id=map.data_id
		      	    where
		      	    	ana.mea_id=${rows_aprendizaje_razonamiento[0].id_modelo}
					    `;
                row_param_rec = yield db.qwerty(sql_parametros_recursos);
            }
            else {
                console.log("no entra");
            }
            var row_param_rec_2 = [];
            if (rows_aprendizaje_razonamiento.length > 0) {
                console.log("si entra_metodos");
                var sql_parametros_recursos_2 = `
		      		select 
		      		ri.ri_id as ri_id,
			      		ri.ri_nombre as nombre_recurso,
			      		ri.ri_descripcion as descripcion_recurso,
			      		enu2.enu_nombre_valor as tipo_salida_recurso,
			      		par.par_nombre as nombre_parametro,
			      		enu1.enu_nombre_valor as tipo_parametro,
			      		par.par_opcional as opcional_parametro,
			      		enu3.enu_nombre_valor as metrica_tipo,
			      		met.met_nombre as nombre_metrica,
			      		pa.pa_nombre as proceso,
					pa.pa_descripcion as proceso2,
			      		var.vs_nombre as variable,
			      		dat.data_name as metadata
		      	    from
		      metodocalculo ana
		      inner join mapeoparametros map on ana.mea_id=map.mea_id
		      inner join parametro par on map.par_ordinal=par.par_id								     
		      inner join recursoimplementacion ri on par.ri_id=ri.ri_id
		      left join metrica met on map.met_id=met.met_id
		      left join variablesimulacion var on map.vs_id=var.vs_id
		      inner join enumeracion enu1 on par.par_tipo_dato=enu1.enu_id
		      inner join enumeracion enu2 on ri.ri_tipo_dato_salida=enu2.enu_id
		      left join enumeracion enu3 on met.met_tipo=enu3.enu_id
		      left join procesoautoconsciencia pa on pa.pa_id=map.pa_id
		      left join data_column dat on dat.data_id=map.data_id
		      	    where
		      	    	ana.mea_id=${rows_aprendizaje_razonamiento[0].id_recoleccion}
					    `;
                row_param_rec_2 = yield db.qwerty(sql_parametros_recursos_2);
                console.log(sql_parametros_recursos_2);
            }
            else {
                console.log("no entra");
            }
            res.render("modificar_reflexivos", {
                error: req.flash("error"),
                succes: req.flash("succes"),
                modificar: rows_general,
                modificar2: rows_aprendizaje_razonamiento,
                modificar3: row_param_rec,
                modificar4: row_param_rec_2,
                session: req.session,
            });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_reflective_process_mod = get_reflective_process_mod;
