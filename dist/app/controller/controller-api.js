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
exports.get_flujo_datos = exports.upd_variables_valor = exports.del_variables_valor = exports.add_variables_valor = exports.upd_variable_simulacion = exports.del_variable_simulacion = exports.add_variable_simulacion = exports.get_variable_simulacion_id = exports.get_variable_simulacion = exports.get_variables_valor = exports.upd_escenario_simulacion = exports.del_escenario_simulacion = exports.escenario_simulacion = exports.add_escenario_simulacion = exports.get_metodo_aprendizaje = exports.objetivos_sujetos = exports.add_metodo_modelo_reflexivos = exports.properties = exports.procesos_reflexive = exports.add_mapeo_parametros = exports.add_metodo_modelo = exports.mod_process_pre_reflexive = exports.del_process_pre_reflexive = exports.process_pre_reflexive_id = exports.procesos_pre_reflexive = exports.add_process_pre_reflexive = exports.upd_ri = exports.del_ri = exports.add_ri = exports.ri = exports.last_EntityID = exports.last_ObjectSubjectID = exports.home = exports.user_models = exports.upd_acciones_umbrales = exports.del_accion = exports.get_accion = exports.add_accion = exports.del_metrica = exports.get_metrica_select = exports.get_metrica = exports.add_metrica = exports.del_aspects = exports.add_aspects = exports.aspects = exports.upd_umbral = exports.del_umbral = exports.add_umbral = exports.get_umbral = exports.umbral = exports.upd_decision_criteria = exports.del_decision_criteria = exports.add_decision_criteria = exports.decision_criteria = exports.upd_escales = exports.del_escales = exports.add_escales = exports.get_escales_select = exports.escales = exports.upd_measurement_units = exports.del_measurement_units = exports.add_measurement_units = exports.measurement_units = exports.get_enumeracion = exports.enumeracion = exports.update_entity = exports.save_entity = exports.entity = exports.update_subjects = exports.save_subjects = exports.save_subjects_objects = exports.delete_subjects_objects = exports.subjects_objects = exports.subjects = exports.deployment_resources = exports.ask_input_arguments = exports.ask_deployment_resources = exports.ask_deployment_resources_select = exports.del_deployment_resources = exports.add_deployment_resources = void 0;
const selfAwarnessModels_1 = require("../models/selfAwarnessModels");
const database_1 = require("../data/database");
const database2_1 = require("../data/database2");
function add_deployment_resources(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        db.add_deployment_resources(req.body, (json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_deployment_resources = add_deployment_resources;
function del_deployment_resources(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        db.del_deployment_resources(req.body.id, (json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_deployment_resources = del_deployment_resources;
function ask_deployment_resources_select(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        db.ask_deployment_resources_select(req.body.tipo, (json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.ask_deployment_resources_select = ask_deployment_resources_select;
function ask_deployment_resources(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        db.ask_deployment_resources(req.body.id, (json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.ask_deployment_resources = ask_deployment_resources;
function ask_input_arguments(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        db.sk_input_arguments(req.body.aspectoId, req.body.metricaId, (json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.ask_input_arguments = ask_input_arguments;
function deployment_resources(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        db.get_deployment_resources((json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.deployment_resources = deployment_resources;
function subjects(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = req.session.active_model.modelID;
        var db = new database_1.mysql_connector();
        db.get_subjects(id, (json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.subjects = subjects;
function subjects_objects(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        var subjectID = req.body.id;
        db.get_subjectsObjects(subjectID, (json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.subjects_objects = subjects_objects;
function delete_subjects_objects(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        var objectID = req.body.id;
        db.delete_subjects_objects(objectID, () => {
            res.json({ Mensaje: "Los datos se han eliminado con exito" });
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.delete_subjects_objects = delete_subjects_objects;
function save_subjects_objects(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        var newSubjectObject = req.body;
        db.save_subjects_objects(newSubjectObject, () => {
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.save_subjects_objects = save_subjects_objects;
function save_subjects(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = req.session.active_model.modelID;
        var db = new database_1.mysql_connector();
        db.save_subjectsObjects(id, req.body);
        res.json({ Mensaje: "Los datos se han enviado con exito" });
    }
    else {
        res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
    }
}
exports.save_subjects = save_subjects;
function update_subjects(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        var elementos = req.body;
        elementos.forEach((e) => {
            db.update_subject(e.id, e.activo);
        });
        res.json({ Mensaje: "Los datos se han enviado con exito" });
    }
    else {
        res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
    }
}
exports.update_subjects = update_subjects;
function entity(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = req.session.active_model.modelID;
        var seleccion = req.body.valorS;
        var db = new database_1.mysql_connector();
        db.get_entitys(id, seleccion, (json) => {
            res.json(json);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.entity = entity;
function save_entity(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = req.session.active_model.modelID;
        var db = new database_1.mysql_connector();
        db.save_entity(id, req.body);
        res.json({ Mensaje: "Los datos se han enviado con exito" });
    }
    else {
        res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
    }
}
exports.save_entity = save_entity;
function update_entity(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var db = new database_1.mysql_connector();
        var elementos = req.body;
        elementos.forEach((e) => {
            db.update_entity(e.id, e.activo);
        });
        res.json({ Mensaje: "Los datos se han enviado con exito" });
    }
    else {
        res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
    }
}
exports.update_entity = update_entity;
function enumeracion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        db.getUser_enumeracion(id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.enumeracion = enumeracion;
function get_enumeracion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var nombre = req.body.tipo;
        var db = new database_1.mysql_connector();
        db.getUser_get_enumeracion(id, nombre, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_enumeracion = get_enumeracion;
function measurement_units(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        db.getUser_measurementUnit(id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.measurement_units = measurement_units;
function add_measurement_units(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var acronym = req.body.acronym;
        var db = new database_1.mysql_connector();
        db.addUser_measurementUnit(idUser, name, descripcion, acronym);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_measurement_units = add_measurement_units;
function del_measurement_units(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idMeasure = req.body.id;
        var db = new database_1.mysql_connector();
        db.delUser_measurementUnit(idUser, idMeasure);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_measurement_units = del_measurement_units;
function upd_measurement_units(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id = req.body.id;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var acronym = req.body.acronym;
        var activo = req.body.activo.toString();
        var db = new database_1.mysql_connector();
        db.updUser_measurementUnit(idUser, id, name, descripcion, acronym, activo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_measurement_units = upd_measurement_units;
function escales(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        db.getUser_escales(id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.escales = escales;
function get_escales_select(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        db.getUser_escales_select(id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_escales_select = get_escales_select;
function add_escales(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var name = req.body.nombre;
        var valor_valido = req.body.valor_valido;
        var tipo = req.body.tipo;
        var db = new database_1.mysql_connector();
        db.addUser_escales(idUser, name, valor_valido, tipo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_escales = add_escales;
function del_escales(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idDecision = req.body.id;
        var db = new database_1.mysql_connector();
        db.delUser_escales(idUser, idDecision);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_escales = del_escales;
function upd_escales(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id = req.body.id;
        var name = req.body.nombre;
        var valor_valido = req.body.valor_valido;
        var tipo = req.body.tipo;
        var activo = req.body.activo.toString();
        var db = new database_1.mysql_connector();
        db.updUser_escales(idUser, id, name, valor_valido, tipo, activo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_escales = upd_escales;
function decision_criteria(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        db.getUser_decision_criteria(id, (jsonCriterio) => {
            res.json(jsonCriterio);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.decision_criteria = decision_criteria;
function add_decision_criteria(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var db = new database_1.mysql_connector();
        db.addUser_criteriaDecision(idUser, name, descripcion);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_decision_criteria = add_decision_criteria;
function del_decision_criteria(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idDecision = req.body.id;
        var db = new database_1.mysql_connector();
        db.delUser_criteriaDecision(idUser, idDecision);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_decision_criteria = del_decision_criteria;
function upd_decision_criteria(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id = req.body.id;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var activo = req.body.activo.toString();
        var db = new database_1.mysql_connector();
        db.updUser_criteriaDecision(idUser, id, name, descripcion, activo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_decision_criteria = upd_decision_criteria;
function umbral(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idDecision = req.body.id;
        var db = new database_1.mysql_connector();
        db.getUser_umbral(id, idDecision, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.umbral = umbral;
function get_umbral(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var nombre = req.body.nombre;
        var db = new database_1.mysql_connector();
        db.getUser_get_umbral(id, nombre, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_umbral = get_umbral;
function add_umbral(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id = req.body.criterio_select;
        var name = req.body.nombre;
        var Interpretacion = req.body.interpretacion;
        var inferior = req.body.inferior;
        var superior = req.body.superior;
        var db = new database_1.mysql_connector();
        db.addUser_umbral(idUser, name, Interpretacion, inferior, superior, id);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_umbral = add_umbral;
function del_umbral(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id_umbral = req.body.id;
        var db = new database_1.mysql_connector();
        db.delUser_umbral(idUser, id_umbral);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_umbral = del_umbral;
function upd_umbral(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id = req.body.id;
        var name = req.body.nombre;
        var interpretacion = req.body.interpretacion;
        var inferior = req.body.inferior;
        var superior = req.body.superior;
        var activo = req.body.activo.toString();
        var db = new database_1.mysql_connector();
        db.updUser_umbral(idUser, id, name, interpretacion, inferior, superior, activo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_umbral = upd_umbral;
function aspects(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idP = req.body.id;
        var db = new database_1.mysql_connector();
        db.getUser_Aspects(id, idP, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.aspects = aspects;
function add_aspects(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var tipo = req.body.tipoS;
        var peso = req.body.peso;
        var idP = req.body.id;
        var activo = req.body.activo;
        var db = new database_1.mysql_connector();
        db.addUser_aspects(idUser, name, descripcion, tipo, peso, idP, activo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_aspects = add_aspects;
function del_aspects(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idaspecto = req.body.idD;
        var db = new database_1.mysql_connector();
        db.delUser_aspects(idUser, idaspecto);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_aspects = del_aspects;
function add_metrica(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var abreviatura = req.body.abreviatura;
        var escala = req.body.escala;
        var unidad = req.body.unidad;
        var tipo = req.body.tipo;
        var idP = req.body.id;
        var activo = req.body.activo.toString();
        var db = new database_1.mysql_connector();
        db.addUser_metrica(idUser, name, descripcion, abreviatura, escala, unidad, tipo, idP, activo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_metrica = add_metrica;
function get_metrica(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idP = req.body.id;
        var db = new database_1.mysql_connector();
        db.getUser_Metrica(id, idP, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_metrica = get_metrica;
function get_metrica_select(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var nombreAs = req.body.nombre;
        var tipoM = req.body.tipo;
        var db = new database_1.mysql_connector();
        db.getUser_Metrica_select(id, nombreAs, tipoM, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_metrica_select = get_metrica_select;
function del_metrica(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idaspecto = req.body.idD;
        var db = new database_1.mysql_connector();
        db.delUser_metrica(idUser, idaspecto);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_metrica = del_metrica;
function add_accion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var meaId = req.body.meaId;
        var idP = req.body.UmbralId;
        var db = new database_1.mysql_connector();
        db.addUser_accion(idUser, name, descripcion, idP, meaId);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_accion = add_accion;
function get_accion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idP = req.body.id;
        var db = new database_1.mysql_connector();
        db.getUser_accion(id, idP, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_accion = get_accion;
function del_accion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idaccion = req.body.id;
        var db = new database_1.mysql_connector();
        db.delUser_accion(idUser, idaccion);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_accion = del_accion;
function upd_acciones_umbrales(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idaccion = req.body.id;
        var nombre = req.body.nombre;
        var descripcion = req.body.descripcion;
        var activo = req.body.activo.toString();
        var db = new database_1.mysql_connector();
        db.upd_acciones_umbrales(idUser, idaccion, nombre, descripcion, activo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_acciones_umbrales = upd_acciones_umbrales;
/*export function user_models(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUserModels(id, (jsonModel: object) => {
      res.json(jsonModel);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}*/
function user_models(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user._id;
            var db = new database2_1.database2();
            var model = new selfAwarnessModels_1.SelfAwarnessQ(-1, "", "", "", "");
            var rows = yield db.qwerty(model.toSqlSelect(["/@/USER/@/"], id.toString()));
            res.json(model.toObjectArray(rows));
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.user_models = user_models;
function home(req, res) {
    if (req.session.user) {
        res.redirect("/");
    }
    else {
        res.send("Home Api");
    }
}
exports.home = home;
function last_ObjectSubjectID(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = req.session.active_model.modelID;
        var db = new database_1.mysql_connector();
        var index = db.getLastObjectSubjectID(id);
        res.json({ id: index });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.last_ObjectSubjectID = last_ObjectSubjectID;
function last_EntityID(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = req.session.active_model.modelID;
        var db = new database_1.mysql_connector();
        var index = db.getLastEntityID(id);
        res.json({ id: index });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.last_EntityID = last_EntityID;
// RECURSOS IMPLEMENTACION
function ri(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        db.getUser_ri(id, (jsonRI) => {
            res.json(jsonRI);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.ri = ri;
function add_ri(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var tipo_dato_salida = req.body.tipo_dato_salida;
        var tipo_recurso = req.body.tipo_recurso;
        var expresion = req.body.expresion;
        var path = req.body.path;
        var instruccion = req.body.instruccion;
        var pf = req.body.pf;
        var instruccionS = req.body.instruccionS;
        var ts = req.body.ts;
        var db = new database_1.mysql_connector();
        db.addUser_ri(idUser, name, descripcion, tipo_dato_salida, tipo_recurso, expresion, path, instruccion, pf, instruccionS, ts);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_ri = add_ri;
function del_ri(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var idDecision = req.body.id;
        var db = new database_1.mysql_connector();
        db.delUser_ri(idUser, idDecision);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_ri = del_ri;
function upd_ri(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id = req.body.id;
        var name = req.body.nombre;
        var valor_valido = req.body.valor_valido;
        var tipo = req.body.tipo;
        var activo = req.body.activo;
        var db = new database_1.mysql_connector();
        db.updUser_ri(idUser, id, name, valor_valido, tipo, activo);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_ri = upd_ri;
function add_process_pre_reflexive(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var inicioP = req.body.inicioP;
        var finP = req.body.finP;
        var aspId = req.body.aspId;
        var sujId = req.body.sujId;
        var paTipo = req.body.paTipo;
        var objId = req.body.objId;
        var objetivo = req.body.objetivo;
        var db = new database_1.mysql_connector();
        db.add_process_pre_reflexive(idUser, name, descripcion, inicioP, finP, aspId, objId, sujId, paTipo, objetivo, (id) => {
            res.json({ id: id });
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_process_pre_reflexive = add_process_pre_reflexive;
function procesos_pre_reflexive(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        db.getUser_procesos_pre_reflexive(id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.procesos_pre_reflexive = procesos_pre_reflexive;
function process_pre_reflexive_id(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id = req.body.id;
        var db = new database_1.mysql_connector();
        db.getUser_procesos_pre_reflexive_id(idUser, id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.process_pre_reflexive_id = process_pre_reflexive_id;
function del_process_pre_reflexive(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var id = req.body.id;
        var db = new database_1.mysql_connector();
        db.del_process_pre_reflexive(idUser, id);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_process_pre_reflexive = del_process_pre_reflexive;
function mod_process_pre_reflexive(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = req.body.id;
        var name = req.body.nombre;
        var descripcion = req.body.descripcion;
        var inicio = req.body.inicio;
        var fin = req.body.fin;
        var db = new database_1.mysql_connector();
        db.mod_process_pre_reflexive(id, name, descripcion, inicio, fin);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.mod_process_pre_reflexive = mod_process_pre_reflexive;
function add_metodo_modelo(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var data = req.body;
        var db = new database_1.mysql_connector();
        db.add_metodo_modelo(data, (resp) => {
            res.json(resp);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_metodo_modelo = add_metodo_modelo;
function add_mapeo_parametros(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var data = req.body;
        var db = new database_1.mysql_connector();
        db.add_mapeo_parametros(data);
        res.json({ mensaje: "La accion fue realizada con exito" });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_mapeo_parametros = add_mapeo_parametros;
function procesos_reflexive(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        db.getUser_procesos_reflexive(id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.procesos_reflexive = procesos_reflexive;
function properties(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var idObj = req.body.id;
        var db = new database_1.mysql_connector();
        db.getUser_properties(idObj, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.properties = properties;
function add_metodo_modelo_reflexivos(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var data = req.body;
        var db = new database_1.mysql_connector();
        db.add_metodo_modelo_reflexivos(data, (resp) => {
            res.json(resp);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_metodo_modelo_reflexivos = add_metodo_modelo_reflexivos;
function objetivos_sujetos(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = req.body.id;
        var db = new database_1.mysql_connector();
        db.objetivos_sujetos(id, (resp) => {
            res.json(resp);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.objetivos_sujetos = objetivos_sujetos;
function get_metodo_aprendizaje(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var metodoid = req.body.id;
        db.get_metodo_aprendizaje(id, metodoid, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_metodo_aprendizaje = get_metodo_aprendizaje;
function add_escenario_simulacion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var nombre = req.body.nombre;
        var descripcion = req.body.descripcion;
        var mea_id = req.body.mea_id;
        db.add_escenario_simulacion(id, nombre, descripcion, mea_id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_escenario_simulacion = add_escenario_simulacion;
function escenario_simulacion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var mea_id = req.body.mea_id;
        db.escenario_simulacion(id, mea_id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.escenario_simulacion = escenario_simulacion;
function del_escenario_simulacion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var idE = req.body.id;
        db.del_escenario_simulacion(id, idE, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_escenario_simulacion = del_escenario_simulacion;
function upd_escenario_simulacion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var idE = req.body.id;
        var nombre = req.body.nombre;
        var descripcion = req.body.descripcion;
        var activo = req.body.activo.toString();
        db.upd_escenario_simulacion(id, idE, nombre, descripcion, activo, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_escenario_simulacion = upd_escenario_simulacion;
function get_variables_valor(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var idV = req.body.id;
        db.get_variables_valor(id, idV, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_variables_valor = get_variables_valor;
function get_variable_simulacion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var mea_id = req.body.mea_id;
        db.get_variable_simulacion(id, mea_id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_variable_simulacion = get_variable_simulacion;
function get_variable_simulacion_id(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var idP = req.body.id;
        db.get_variable_simulacion_id(id, idP, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_variable_simulacion_id = get_variable_simulacion_id;
function add_variable_simulacion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var nombre = req.body.nombre;
        var mea_id = req.body.mea_id;
        db.add_variable_simulacion(id, nombre, mea_id, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_variable_simulacion = add_variable_simulacion;
function del_variable_simulacion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var idE = req.body.id;
        db.del_variable_simulacion(id, idE, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_variable_simulacion = del_variable_simulacion;
function upd_variable_simulacion(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var idE = req.body.id;
        var nombre = req.body.nombre;
        var activo = req.body.activo.toString();
        db.upd_variable_simulacion(id, idE, nombre, activo, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_variable_simulacion = upd_variable_simulacion;
function add_variables_valor(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var es_id = req.body.es_id;
        var vs_id = req.body.vs_id;
        var vas_valor = req.body.vas_valor;
        db.add_variables_valor(id, es_id, vs_id, vas_valor, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.add_variables_valor = add_variables_valor;
function del_variables_valor(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var idE = req.body.vas_valor;
        db.del_variables_valor(id, idE, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.del_variables_valor = del_variables_valor;
function upd_variables_valor(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var vs_id = req.body.vs_id;
        var vas_valor = req.body.vas_valor;
        var vas_valor_viejo = req.body.vas_valor_viejo;
        db.upd_variables_valor(id, vs_id, vas_valor, vas_valor_viejo, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.upd_variables_valor = upd_variables_valor;
function get_flujo_datos(req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user.userID;
        var db = new database_1.mysql_connector();
        var comuni = req.body.comunicacion;
        var propiedad = req.body.propiedad;
        db.get_flujo_datos(id, comuni, propiedad, (jsonEscala) => {
            res.json(jsonEscala);
        });
    }
    else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}
exports.get_flujo_datos = get_flujo_datos;
