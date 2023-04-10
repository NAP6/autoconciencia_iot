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
exports.add_mapeo_parametros = exports.ask_input_arguments = exports.ask_deployment_resources = exports.ask_deployment_resources_select = exports.mod_deployment_resources = exports.del_deployment_resources = exports.add_deployment_resources = exports.deployment_resources = exports.deployment_resources_page = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
function deployment_resources_page(req, res) {
    res.render("deployment_resources", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.deployment_resources_page = deployment_resources_page;
function deployment_resources(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var impRes = new selfAwarnessModels_1.ImplementationResourceQ(-1, "", "", "");
            var rows = yield db.qwerty(impRes.toSqlSelect([], []));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.deployment_resources = deployment_resources;
function add_deployment_resources(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var data = req.body;
            var id = 0;
            if (data.tipoRecurso == "0") {
                var formula = new selfAwarnessModels_1.FormulaQ(-1, data.nombre, data.descripcion.replace(/'/g, "\\'"), data.EspecificoTipo.datoSalida, data.EspecificoTipo.formula.replace(/'/g, "\\'"));
                var rows = yield db.qwerty(formula.toSqlInsert([], []));
                id = rows[0][0].id;
            }
            else if (data.tipoRecurso == "1") {
                var funcion = new selfAwarnessModels_1.FunctionQ(-1, data.nombre, data.descripcion.replace(/'/g, "\\'"), data.EspecificoTipo.datoSalida, "", //data.path,
                data.EspecificoTipo.instrucciones.replace(/'/g, "\\'"));
                var rows = yield db.qwerty(funcion.toSqlInsert(["/@/P_EXIST/@/"], [data.EspecificoTipo.preExistent ? "1" : "0"]));
                id = rows[0][0].id;
            }
            else if (data.tipoRecurso == "2") {
                var service = new selfAwarnessModels_1.WebServiceQ(-1, data.nombre, data.descripcion.replace(/'/g, "\\'"), data.EspecificoTipo.datoSalida, data.EspecificoTipo.endPoint, data.EspecificoTipo.instrucciones.replace(/'/g, "\\'"), data.EspecificoTipo.formatoSalida);
                var rows = yield db.qwerty(service.toSqlInsert(["/@/P_EXIST/@/"], [data.EspecificoTipo.preExistent ? "1" : "0"]));
                id = rows[0][0].id;
            }
            for (var i = 0; i < data.arregloParametros.length; i++) {
                var param = data.arregloParametros[i];
                var sql = `INSERT INTO 
	  		parametro (
	  			par_ordinal, 
		  		par_nombre, 
		  		par_opcional, 
		  		par_activo, 
		  		par_tipo_dato, 
		  		ri_id
  			) VALUES (
	  			'${param.ordinal}', 
		  		'${param.nombre}', 
		  		'${param.opcional ? 1 : 0}', 
				'1',
		  		'${param.tipo}', 
				'${id.toString()}'
  			)`;
                yield db.qwerty(sql);
            }
            res.json({ mensaje: "Elemento guardado exitosamente" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_deployment_resources = add_deployment_resources;
function del_deployment_resources(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var impRes = new selfAwarnessModels_1.ImplementationResourceQ(req.body.id, "", "", "");
            yield db.qwerty(impRes.toSqlDelete([], []));
            res.json({ mensaje: "exito al eleminar" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_deployment_resources = del_deployment_resources;
function mod_deployment_resources(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var data = req.body;
            var id = 0;
            if (data.tipoRecurso == "0") {
                var formula = new selfAwarnessModels_1.FormulaQ(-1, data.nombre, data.descripcion.replace(/'/g, "\\'"), data.EspecificoTipo.datoSalida, data.EspecificoTipo.formula.replace(/'/g, "\\'"));
                var rows = yield db.qwerty(formula.toSqlUpdate([], data.id_recurso));
                id = rows[0][0].id;
            }
            else if (data.tipoRecurso == "1") {
                var funcion = new selfAwarnessModels_1.FunctionQ(-1, data.nombre, data.descripcion.replace(/'/g, "\\'"), data.EspecificoTipo.datoSalida, "", //data.path,
                data.EspecificoTipo.instrucciones.replace(/'/g, "\\'"));
                var rows = yield db.qwerty(funcion.toSqlUpdate(["/@/P_EXIST/@/", "/@/ID_RECURSO/@/"], [data.EspecificoTipo.preExistent ? "1" : "0", data.id_recurso]));
                id = rows[0][0].id;
            }
            else if (data.tipoRecurso == "2") {
                var service = new selfAwarnessModels_1.WebServiceQ(-1, data.nombre, data.descripcion.replace(/'/g, "\\'"), data.EspecificoTipo.datoSalida, data.EspecificoTipo.endPoint, data.EspecificoTipo.instrucciones.replace(/'/g, "\\'"), data.EspecificoTipo.formatoSalida);
                var rows = yield db.qwerty(service.toSqlUpdate(["/@/P_EXIST/@/", "/@/ID_RECURSO/@/"], [data.EspecificoTipo.preExistent ? "1" : "0", data.id_recurso]));
                id = rows[0][0].id;
            }
            var param = data.arregloParametros;
            console.log(param);
            for (var i = 0; i < data.arregloParametros.length; i++) {
                var param = data.arregloParametros[i];
                if (param.id == undefined) {
                    var sql = `INSERT INTO 
	  		parametro (
	  			par_ordinal, 
		  		par_nombre, 
		  		par_opcional, 
		  		par_activo, 
		  		par_tipo_dato, 
		  		ri_id
  			) VALUES (
	  			'${param.ordinal}', 
		  		'${param.nombre}', 
		  		'${param.opcional ? 1 : 0}', 
				'1',
		  		'${param.tipo}', 
				'${id.toString()}'
  			)`;
                    yield db.qwerty(sql);
                }
                else if (param.id != undefined && param.nombre != undefined) {
                    var sql = `UPDATE parametro 
			SET par_ordinal = '${param.ordinal}', 
				par_nombre= '${param.nombre}', 
		  	        par_opcional= '${param.opcional ? 1 : 0}', 
		  		par_activo= 1, 
		  		par_tipo_dato= '${param.tipo}'
				WHERE par_id='${param.id}'`;
                    yield db.qwerty(sql);
                }
                else {
                    param.parametroEliminar.forEach((elem) => __awaiter(this, void 0, void 0, function* () {
                        var sql = `DELET parametro WHERE par_id='${elem}'`;
                        console.log(sql);
                        yield db.qwerty(sql);
                    }));
                }
            }
            res.json({ mensaje: "Elemento guardado exitosamente" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.mod_deployment_resources = mod_deployment_resources;
function ask_deployment_resources_select(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var impRes = new selfAwarnessModels_1.ImplementationResourceQ(-1, "", "", "");
            var rows = yield db.qwerty(impRes.toSqlSelect(["/@/TYPE/@/"], [req.body.tipo]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.ask_deployment_resources_select = ask_deployment_resources_select;
function ask_deployment_resources(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var impRes = new selfAwarnessModels_1.ImplementationResourceQ(req.body.id, "", "", "");
            var parameter = new selfAwarnessModels_1.ParameterQ(-1, -1, "", -1, false);
            var rows = yield db.qwerty(impRes.toSqlSelect(["/@/ALL/@/"], []));
            var rowsP = yield db.qwerty(parameter.toSqlSelect(["/@/RI_ID/@/"], [impRes.id.toString()]));
            var arr_Parameters = parameter.toObjectArray(rowsP);
            if (rows[0][0].tipo_recurso == 0) {
                var formula = new selfAwarnessModels_1.FormulaQ(-1, "", "", "", "");
                formula = formula.toObjectArray(rows)[0];
                formula.containsParameter = arr_Parameters;
                res.json(formula);
            }
            else if (rows[0][0].tipo_recurso == 1) {
                var functio = new selfAwarnessModels_1.FunctionQ(-1, "", "", "", "", "");
                functio = functio.toObjectArray(rows)[0];
                functio.containsParameter = arr_Parameters;
                res.json(functio);
            }
            else {
                var webService = new selfAwarnessModels_1.WebServiceQ(-1, "", "", "", "", "", "");
                webService = webService.toObjectArray(rows)[0];
                webService.containsParameter = arr_Parameters;
                res.json(webService);
            }
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.ask_deployment_resources = ask_deployment_resources;
function ask_input_arguments(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        var METADATA = 25;
        var SIMULATION_VARIABLE = 24;
        var modelID = (_a = req.session) === null || _a === void 0 ? void 0 : _a.active_model.modelID;
        if ((_b = req.session) === null || _b === void 0 ? void 0 : _b.user) {
            var db = new database2_1.database2();
            if (req.body.metricaId != undefined) {
                var sql = `Select
	    	pro.pa_id as id, pro.pa_nombre as nombre, pro.pa_descripcion as descripcion
		from
		procesoautoconsciencia pro, metodoaprendizajerazonamiento as mea WHERE
		mea.met_id=${req.body.metricaId} AND mea.pa_id=pro.pa_id AND pro.ma_id=${modelID}
	    	`;
                var rows = yield db.qwerty(sql);
                res.json(rows);
            }
            else if (req.body.tipo_metrica == METADATA) {
                var sql = `Select
			me.data_id as id, me.data_name as nombre
		from
			data_column me,relation_process_mapeo bat, metodoaprendizajerazonamiento met, metodorecoleccion metrec
		where
			met.pa_id=${req.body.procces_of_direct_metric} AND 
			met.mea_id=metrec.mea_id AND 
			metrec.flu_id=bat.id_flow AND
			bat.ma_id=metrec.ma_id AND
			bat.id_colum=me.data_id AND
			bat.ma_id=me.ma_id AND
			me.ma_id=${modelID}`;
                var rows = yield db.qwerty(sql);
                res.json(rows);
            }
            else if (req.body.tipo_metrica == SIMULATION_VARIABLE) {
                var sql = `
	Select 
	  vs.vs_id as id, vs.vs_nombre as nombre
	  from
	  variablesimulacion vs, metodoaprendizajerazonamiento mea
	  where
	mea.pa_id=${req.body.proceso} and mea.mea_id=vs.mea_id`;
                var rows = yield db.qwerty(sql);
                res.json(rows);
            }
            else {
                var sql = `
	Select 
	  me.met_id as id, me.met_nombre as nombre
	  from
	  metrica me
	  where
	me.met_tipo=${req.body.tipo_metrica}`;
                var rows = yield db.qwerty(sql);
                res.json(rows);
            }
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.ask_input_arguments = ask_input_arguments;
function add_mapeo_parametros(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var data = req.body;
            var stryaux = "";
            data.forEach((element) => {
                stryaux += `(
	      		'${element.par_ordinal}', 
	      		'${element.mea_id}',
	      		'${element.mp_tipo_entrada}',
	      		${element.met_id == undefined ? "NULL" : element.met_id},
	      		${element.vs_id == undefined ? "NULL" : element.vs_id},
	      		${element.md_id == undefined ? "NULL" : element.md_id},
		  	${element.data_id == undefined ? "NULL" : element.data_id},
    			${element.proceso == undefined ? "NULL" : element.proceso}),`;
            });
            var sql = `INSERT INTO 
    		mapeoparametros (par_ordinal, mea_id, mp_tipo_entrada,met_id,vs_id,md_id,data_id,pa_id) 
		VALUES ` + stryaux.substring(0, stryaux.length - 1);
            var db = new database2_1.database2();
            db.qwerty(sql);
            res.json({ mensaje: "La accion fue realizada con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_mapeo_parametros = add_mapeo_parametros;
