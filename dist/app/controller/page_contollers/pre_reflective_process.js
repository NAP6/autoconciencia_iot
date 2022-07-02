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
exports.get_select_cargar_recurso = exports.get_model_analisis = exports.get_recoleccion_datos = exports.get_metodos_recoleccion_analisis = exports.get_last_insert_process = exports.get_pre_reflective_process_mod = exports.del_pre_reflective_process = exports.mod_metodos_modelos = exports.mod_pre_reflective_process = exports.add_pre_reflective_process = exports.get_pre_reflective_process = exports.add_metodo_modelo = exports.pre_reflective_process = void 0;
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
            var db = new database2_1.database2();
            var modeloID = req.session.active_model.modelID;
            var coll = new selfAwarnessModels_1.CollectionMethodQ(-1, "");
            coll.produces = new DirectMetric_1.DirectMetric(data.m_recoleccion.met_id, "", "", "");
            coll.isSupported = new DataFlow_1.DataFlow(data.m_recoleccion.flu_id, "", "", data.m_recoleccion.mr_tipo, "");
            coll.collectsProperty = [new Property_1.Property(data.m_recoleccion.pro_id, "")];
            var row1 = yield db.qwerty(coll.toSqlInsert(["/@/PROCES/@/", "/@/MODEL/@/", "/@/OBJECT/@/"], [data.proceso_id, modeloID, data.m_recoleccion.obj_id]));
            var anali = new selfAwarnessModels_1.AnalysisModelQ(-1, data.m_modelo.ma_tipo);
            anali.produces = new Indicator_1.Indicator(data.m_modelo.met_id, "", "", "", "");
            var row2 = yield db.qwerty(anali.toSqlInsert(["/@/PROCES/@/", "/@/CRITERIA/@/"], [data.proceso_id, data.m_modelo.criterio_id]));
            var resp = [row1[0][0].id, row2[0][0].id];
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
            if (newProcess.tipoE) {
                process.executionType = newProcess.tipoE;
            }
            if (newProcess.intervaloE) {
                process.executionTimeInterval = newProcess.intervaloE;
            }
            if (newProcess.horaE) {
                process.executionTime = newProcess.horaE;
            }
            process.active = newProcess.active;
            var rows = yield db.qwerty(process.toSqlInsert(["/@/ASPECTID/@/", "/@/SUBJECT/@/", "/@/MODEL/@/", "/@/HORA/@/"], [newProcess.aspId, newProcess.sujId, modeloID, newProcess.unidadT]));
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
function mod_metodos_modelos(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var comunicacion = req.body.comunicacion;
            var propiedad = req.body.propiedad;
            var flujo = req.body.flujo_datos;
            var metricaDirecta = req.body.metrica_directa;
            var metricaIndicador = req.body.indicador;
            var recurso = req.body.recurso;
            var metodo_recoleccion = req.body.mea_id_reco;
            var metodo_analisis = req.body.mea_id_anali;
            var rows = yield db.qwerty(`
		
		UPDATE
			metodoaprendizajerazonamiento mea
	    		SET
			mea.met_id=${metricaIndicador}
	    		WHERE
	    		mea.mea_id=${metodo_analisis};
						`);
            /*
               *
            UPDATE
                    metodorecoleccion mr
                        SET
                    mr.mr_tipo_comunicacion=${comunicacion},
                    mr.pro_id=${propiedad},
                    mr.flu_id=${flujo}
                        WHERE
                        mr.mea_id=${metodo_recoleccion};
        UPDATE
                    metodoaprendizajerazonamiento mea
                        SET
                    mea.met_id=${metricaDirecta}
                        WHERE
                        mea.mea_id=${metodo_recoleccion};
               * */
            res.json({ Mensaje: "Se modifico con exito la recoleccion de datos" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.mod_metodos_modelos = mod_metodos_modelos;
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
            var sql_aprendizaje_razonamiento = `
		select *
		from
			(select mtl.mea_id as id_recoleccion,
				    mtl.mea_tipo as tipo_metodo,
				    mtl.pa_id as proceso_id,
				    mtl.met_id as metrica_metodo,
				    mt.met_nombre as metrica_metodo_nombre,
				    rec.mr_tipo_comunicacion as tipo_id, 
				    enu.enu_nombre_valor as tipo_comunicacion,
				    rec.pro_id as propiedad_id,
				    pro.pro_nombre as propiedad,
				    rec.flu_id as flujo_id,
				    flu.flu_descripcion as flu_nombre,
				    rec.obj_id as objeto 
			from metodoaprendizajerazonamiento mtl
				    inner join metodorecoleccion rec on mtl.mea_id=rec.mea_id 
				    inner join propiedad pro on pro.pro_id = rec.pro_id and pro.ma_id=rec.ma_id 
				    inner join flujodatos flu on flu.flu_id= rec.flu_id and rec.ma_id =flu.ma_id
				    inner join enumeracion enu on enu.enu_id=rec.mr_tipo_comunicacion
				    inner join metrica mt on mt.met_id=mtl.met_id) ta_1,
			(select mtl.pa_id as proceso_id_2,
				mtl.met_id as metrica_modelo,
				met.met_nombre as metrica_modelo_nombre,
				ana.ma_tipo_recurso as tipo_recurso,
				ana.cd_id as criterio_id,
				cri.cd_nombre as criterio_nombre,
				mtl.mea_id as id_modelo
				from metodoaprendizajerazonamiento mtl
				inner join modeloanalisis ana on mtl.mea_id=ana.mea_id
				inner join criteriodecision cri on cri.cd_id=ana.cd_id
				inner join metrica met on met.met_id=mtl.met_id) ta_2
		where
			ta_1.proceso_id=${rows_general[0].id} and
	  		ta_1.proceso_id=ta_2.proceso_id_2`;
            var rows_aprendizaje_razonamiento = yield db.qwerty(sql_aprendizaje_razonamiento);
            var row_param_rec = [];
            if (rows_aprendizaje_razonamiento.length > 0) {
                console.log('si entra');
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
		pa.pa_descripcion as proceso,
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
                console.log('no entra');
            }
            res.render("modificar_pre_reflexivos", {
                error: req.flash("error"),
                succes: req.flash("succes"),
                modificar: rows_general,
                modificar2: rows_aprendizaje_razonamiento,
                modificar3: row_param_rec,
                session: req.session,
            });
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
function get_metodos_recoleccion_analisis(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var id = req.body.id;
            var sql = `SELECT 
		  mea_id as metodo_id,
		  met_id as metrica_id,
		  mea_tipo as tipo
		  FROM
		   metodoaprendizajerazonamiento
		  WHERE pa_id=${id}`;
            var rows = yield db.qwerty(sql);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_metodos_recoleccion_analisis = get_metodos_recoleccion_analisis;
function get_recoleccion_datos(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var id = req.body.mea_id;
            var rows = yield db.qwerty(`SELECT 
		  mr_tipo_comunicacion as comunicacion,
		  pro_id as propiedad,
		  flu_id as flujo
		  FROM
		   metodorecoleccion
		  WHERE mea_id=${id}`);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_recoleccion_datos = get_recoleccion_datos;
function get_model_analisis(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var id = req.body.mea_id;
            var rows = yield db.qwerty(`SELECT 
		  ma_tipo_recurso as recurso,
		  cd_id as criterio
		  FROM
		   modeloanalisis
		  WHERE mea_id=${id}`);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_model_analisis = get_model_analisis;
function get_select_cargar_recurso(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var id = req.body.mea_id;
            var rows = yield db.qwerty(`SELECT
		rec.ri_id as id,
		rec.ri_nombre as name
		FROM
			mapeoparametros map,
			parametro par,
			recursoimplementacion rec
		WHERE 
	    		map.mea_id=${id} AND
	    		par.par_id=map.par_ordinal AND
	    		rec.ri_id=par.ri_id`);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_select_cargar_recurso = get_select_cargar_recurso;
