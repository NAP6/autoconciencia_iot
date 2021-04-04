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
exports.ask_deployment_resources = exports.ask_deployment_resources_select = exports.del_deployment_resources = exports.add_deployment_resources = exports.deployment_resources = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
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
                var formula = new selfAwarnessModels_1.FormulaQ(-1, data.nombre, data.descripcion.replace("'", "\\'"), data.EspecificoTipo.datoSalida, data.EspecificoTipo.formula);
                var rows = yield db.qwerty(formula.toSqlInsert([], []));
                id = rows[0][0].id;
            }
            else if (data.tipoRecurso == "1") {
                var funcion = new selfAwarnessModels_1.FunctionQ(-1, data.nombre, data.descripcion.replace("'", "\\'"), data.EspecificoTipo.datoSalida, "", //data.path,
                data.EspecificoTipo.instrucciones);
                var rows = yield db.qwerty(funcion.toSqlInsert(["/@/P_EXIST/@/"], [data.EspecificoTipo.preExistent ? "1" : "0"]));
                id = rows[0][0].id;
            }
            else if (data.tipoRecurso == "2") {
                var service = new selfAwarnessModels_1.WebServiceQ(-1, data.nombre, data.descripcion.replace("'", "\\'"), data.EspecificoTipo.datoSalida, data.EspecificoTipo.endPoint, data.EspecificoTipo.instrucciones, data.EspecificoTipo.formatoSalida);
                var rows = yield db.qwerty(service.toSqlInsert(["/@/P_EXIST/@/"], [data.EspecificoTipo.preExistent ? "1" : "0"]));
                id = rows[0][0].id;
            }
            for (var i = 0; i < data.arregloParametros.length; i++) {
                var param = data.arregloParametros[i];
                var parameter = new selfAwarnessModels_1.ParameterQ(param.ordinal, param.nombre, param.tipo, param.opcional == "true" ? true : false);
                var active = param.activo == "true" ? "1" : "0";
                yield db.qwerty(parameter.toSqlInsert(["/@/ACTIVE/@/", "/@/ID/@/"], [active, id.toString()]));
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
            var parameter = new selfAwarnessModels_1.ParameterQ(-1, "", -1, false);
            var rows = yield db.qwerty(impRes.toSqlSelect(["/@/ALL/@/"], []));
            var rowsP = yield db.qwerty(parameter.toSqlSelect(["/@/RI_ID/@/"], [impRes.id.toString()]));
            var arr_Parameters = parameter.toObjectArray(rowsP);
            if (rows[0][0].tipo_recurso == 0) {
                console.log("Es una formula");
                var formula = new selfAwarnessModels_1.FormulaQ(-1, "", "", "", "");
                formula = formula.toObjectArray(rows)[0];
                formula.containsParameter = arr_Parameters;
                console.log(formula);
                res.json(formula);
            }
            else if (rows[0][0].tipo_recurso == 1) {
                console.log("Es una funcion");
                var functio = new selfAwarnessModels_1.FunctionQ(-1, "", "", "", "", "");
                functio = functio.toObjectArray(rows)[0];
                functio.containsParameter = arr_Parameters;
                console.log(functio);
                res.json(functio);
            }
            else {
                console.log("Es un servicio");
                var webService = new selfAwarnessModels_1.WebServiceQ(-1, "", "", "", "", "", "");
                webService = webService.toObjectArray(rows)[0];
                webService.containsParameter = arr_Parameters;
                console.log(webService);
                res.json(webService);
            }
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.ask_deployment_resources = ask_deployment_resources;
