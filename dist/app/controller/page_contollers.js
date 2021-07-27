"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_scales = exports.scales = exports.upd_measurement_units = exports.del_measurement_units = exports.add_measurement_units = exports.get_measurement_units = exports.measurement_units = exports.add_metrics_aspects = exports.del_metrics = exports.mod_metrics = exports.add_metrics = exports.get_metrics_type_aspects = exports.get_metrics_type = exports.get_metrics_aspects = exports.get_metrics = exports.metrics = exports.del_aspects_objects = exports.add_relation_objects_aspects = exports.get_aspects_objects_process = exports.get_aspects_objects = exports.del_aspects = exports.mod_aspecs = exports.add_aspects = exports.get_aspects = exports.aspects = exports.singup_save = exports.singup = exports.get_enumeracion = exports.subjects_aspects = exports.delete_subjects_goal = exports.save_subjects_goal = exports.subjects_goals = exports.update_subjects = exports.subjects = exports.subject = exports.get_objects_aspects = exports.update_entitys = exports.entitys = exports.entity = exports.update_model = exports.models = exports.logout = exports.home = exports.active_model = exports.user_models = exports.save_new_model = exports.select_model = exports.start_session = exports.login = exports.loggedIn = void 0;
exports.upd_simulation_value = exports.add_simulation_value = exports.get_simulation_value = exports.del_simulation_scenario = exports.upd_simulation_scenario = exports.add_simulation_scenario = exports.get_simulation_scenario = exports.del_simulation_variable = exports.upd_simulation_variable = exports.add_simulation_variable = exports.get_simulation_variable = exports.get_data_flow = exports.get_properties = exports.get_reflective_process_mod = exports.add_metodo_modelo2 = exports.del_reflective_process = exports.get_reflective_process = exports.add_reflective_process = exports.get_select_cargar_recurso = exports.get_model_analisis = exports.get_recoleccion_datos = exports.get_metodos_recoleccion_analisis = exports.mod_metodos_modelos = exports.mod_pre_reflective_process = exports.get_last_insert_process = exports.get_pre_reflective_process_mod = exports.add_metodo_modelo = exports.del_pre_reflective_process = exports.get_pre_reflective_process = exports.add_pre_reflective_process = exports.upd_umbral = exports.del_umbral = exports.add_umbral = exports.get_umbral = exports.upd_criteria = exports.del_criteria = exports.add_criteria = exports.get_criteria = exports.criteria = exports.add_mapeo_parametros = exports.ask_input_arguments = exports.ask_deployment_resources = exports.ask_deployment_resources_select = exports.del_deployment_resources = exports.add_deployment_resources = exports.deployment_resources = exports.deployment_resources_page = exports.upd_scales = exports.del_scales = exports.add_scales = void 0;
exports.generate_model = exports.del_action = exports.upd_action = exports.add_action = exports.get_action = exports.del_simulation_value = void 0;
var loggedIn_1 = require("./page_contollers/loggedIn");
Object.defineProperty(exports, "loggedIn", { enumerable: true, get: function () { return loggedIn_1.loggedIn; } });
var logIn_1 = require("./page_contollers/logIn");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return logIn_1.login; } });
var start_session_1 = require("./page_contollers/start_session");
Object.defineProperty(exports, "start_session", { enumerable: true, get: function () { return start_session_1.start_session; } });
Object.defineProperty(exports, "select_model", { enumerable: true, get: function () { return start_session_1.select_model; } });
Object.defineProperty(exports, "save_new_model", { enumerable: true, get: function () { return start_session_1.save_new_model; } });
var user_models_1 = require("./page_contollers/user_models");
Object.defineProperty(exports, "user_models", { enumerable: true, get: function () { return user_models_1.user_models; } });
var home_1 = require("./page_contollers/home");
Object.defineProperty(exports, "active_model", { enumerable: true, get: function () { return home_1.active_model; } });
Object.defineProperty(exports, "home", { enumerable: true, get: function () { return home_1.home; } });
var logOut_1 = require("./page_contollers/logOut");
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return logOut_1.logout; } });
var models_1 = require("./page_contollers/models");
Object.defineProperty(exports, "models", { enumerable: true, get: function () { return models_1.models; } });
Object.defineProperty(exports, "update_model", { enumerable: true, get: function () { return models_1.update_model; } });
var entity_1 = require("./page_contollers/entity");
Object.defineProperty(exports, "entity", { enumerable: true, get: function () { return entity_1.entity; } });
Object.defineProperty(exports, "entitys", { enumerable: true, get: function () { return entity_1.entitys; } });
Object.defineProperty(exports, "update_entitys", { enumerable: true, get: function () { return entity_1.update_entitys; } });
Object.defineProperty(exports, "get_objects_aspects", { enumerable: true, get: function () { return entity_1.get_objects_aspects; } });
var subject_1 = require("./page_contollers/subject");
Object.defineProperty(exports, "subject", { enumerable: true, get: function () { return subject_1.subject; } });
Object.defineProperty(exports, "subjects", { enumerable: true, get: function () { return subject_1.subjects; } });
Object.defineProperty(exports, "update_subjects", { enumerable: true, get: function () { return subject_1.update_subjects; } });
Object.defineProperty(exports, "subjects_goals", { enumerable: true, get: function () { return subject_1.subjects_goals; } });
Object.defineProperty(exports, "save_subjects_goal", { enumerable: true, get: function () { return subject_1.save_subjects_goal; } });
Object.defineProperty(exports, "delete_subjects_goal", { enumerable: true, get: function () { return subject_1.delete_subjects_goal; } });
Object.defineProperty(exports, "subjects_aspects", { enumerable: true, get: function () { return subject_1.subjects_aspects; } });
var enumeration_1 = require("./page_contollers/enumeration");
Object.defineProperty(exports, "get_enumeracion", { enumerable: true, get: function () { return enumeration_1.get_enumeracion; } });
var singup_1 = require("./page_contollers/singup");
Object.defineProperty(exports, "singup", { enumerable: true, get: function () { return singup_1.singup; } });
Object.defineProperty(exports, "singup_save", { enumerable: true, get: function () { return singup_1.singup_save; } });
var aspects_1 = require("./page_contollers/aspects");
Object.defineProperty(exports, "aspects", { enumerable: true, get: function () { return aspects_1.aspects; } });
Object.defineProperty(exports, "get_aspects", { enumerable: true, get: function () { return aspects_1.get_aspects; } });
Object.defineProperty(exports, "add_aspects", { enumerable: true, get: function () { return aspects_1.add_aspects; } });
Object.defineProperty(exports, "mod_aspecs", { enumerable: true, get: function () { return aspects_1.mod_aspecs; } });
Object.defineProperty(exports, "del_aspects", { enumerable: true, get: function () { return aspects_1.del_aspects; } });
Object.defineProperty(exports, "get_aspects_objects", { enumerable: true, get: function () { return aspects_1.get_aspects_objects; } });
Object.defineProperty(exports, "get_aspects_objects_process", { enumerable: true, get: function () { return aspects_1.get_aspects_objects_process; } });
Object.defineProperty(exports, "add_relation_objects_aspects", { enumerable: true, get: function () { return aspects_1.add_relation_objects_aspects; } });
Object.defineProperty(exports, "del_aspects_objects", { enumerable: true, get: function () { return aspects_1.del_aspects_objects; } });
var metrics_1 = require("./page_contollers/metrics");
Object.defineProperty(exports, "metrics", { enumerable: true, get: function () { return metrics_1.metrics; } });
Object.defineProperty(exports, "get_metrics", { enumerable: true, get: function () { return metrics_1.get_metrics; } });
Object.defineProperty(exports, "get_metrics_aspects", { enumerable: true, get: function () { return metrics_1.get_metrics_aspects; } });
Object.defineProperty(exports, "get_metrics_type", { enumerable: true, get: function () { return metrics_1.get_metrics_type; } });
Object.defineProperty(exports, "get_metrics_type_aspects", { enumerable: true, get: function () { return metrics_1.get_metrics_type_aspects; } });
Object.defineProperty(exports, "add_metrics", { enumerable: true, get: function () { return metrics_1.add_metrics; } });
Object.defineProperty(exports, "mod_metrics", { enumerable: true, get: function () { return metrics_1.mod_metrics; } });
Object.defineProperty(exports, "del_metrics", { enumerable: true, get: function () { return metrics_1.del_metrics; } });
Object.defineProperty(exports, "add_metrics_aspects", { enumerable: true, get: function () { return metrics_1.add_metrics_aspects; } });
var measurement_units_1 = require("./page_contollers/measurement_units");
Object.defineProperty(exports, "measurement_units", { enumerable: true, get: function () { return measurement_units_1.measurement_units; } });
Object.defineProperty(exports, "get_measurement_units", { enumerable: true, get: function () { return measurement_units_1.get_measurement_units; } });
Object.defineProperty(exports, "add_measurement_units", { enumerable: true, get: function () { return measurement_units_1.add_measurement_units; } });
Object.defineProperty(exports, "del_measurement_units", { enumerable: true, get: function () { return measurement_units_1.del_measurement_units; } });
Object.defineProperty(exports, "upd_measurement_units", { enumerable: true, get: function () { return measurement_units_1.upd_measurement_units; } });
var scales_1 = require("./page_contollers/scales");
Object.defineProperty(exports, "scales", { enumerable: true, get: function () { return scales_1.scales; } });
Object.defineProperty(exports, "get_scales", { enumerable: true, get: function () { return scales_1.get_scales; } });
Object.defineProperty(exports, "add_scales", { enumerable: true, get: function () { return scales_1.add_scales; } });
Object.defineProperty(exports, "del_scales", { enumerable: true, get: function () { return scales_1.del_scales; } });
Object.defineProperty(exports, "upd_scales", { enumerable: true, get: function () { return scales_1.upd_scales; } });
var deployment_resources_1 = require("./page_contollers/deployment_resources");
Object.defineProperty(exports, "deployment_resources_page", { enumerable: true, get: function () { return deployment_resources_1.deployment_resources_page; } });
Object.defineProperty(exports, "deployment_resources", { enumerable: true, get: function () { return deployment_resources_1.deployment_resources; } });
Object.defineProperty(exports, "add_deployment_resources", { enumerable: true, get: function () { return deployment_resources_1.add_deployment_resources; } });
Object.defineProperty(exports, "del_deployment_resources", { enumerable: true, get: function () { return deployment_resources_1.del_deployment_resources; } });
Object.defineProperty(exports, "ask_deployment_resources_select", { enumerable: true, get: function () { return deployment_resources_1.ask_deployment_resources_select; } });
Object.defineProperty(exports, "ask_deployment_resources", { enumerable: true, get: function () { return deployment_resources_1.ask_deployment_resources; } });
Object.defineProperty(exports, "ask_input_arguments", { enumerable: true, get: function () { return deployment_resources_1.ask_input_arguments; } });
Object.defineProperty(exports, "add_mapeo_parametros", { enumerable: true, get: function () { return deployment_resources_1.add_mapeo_parametros; } });
var criteria_1 = require("./page_contollers/criteria");
Object.defineProperty(exports, "criteria", { enumerable: true, get: function () { return criteria_1.criteria; } });
Object.defineProperty(exports, "get_criteria", { enumerable: true, get: function () { return criteria_1.get_criteria; } });
Object.defineProperty(exports, "add_criteria", { enumerable: true, get: function () { return criteria_1.add_criteria; } });
Object.defineProperty(exports, "del_criteria", { enumerable: true, get: function () { return criteria_1.del_criteria; } });
Object.defineProperty(exports, "upd_criteria", { enumerable: true, get: function () { return criteria_1.upd_criteria; } });
var umbral_1 = require("./page_contollers/umbral");
Object.defineProperty(exports, "get_umbral", { enumerable: true, get: function () { return umbral_1.get_umbral; } });
Object.defineProperty(exports, "add_umbral", { enumerable: true, get: function () { return umbral_1.add_umbral; } });
Object.defineProperty(exports, "del_umbral", { enumerable: true, get: function () { return umbral_1.del_umbral; } });
Object.defineProperty(exports, "upd_umbral", { enumerable: true, get: function () { return umbral_1.upd_umbral; } });
var pre_reflective_process_1 = require("./page_contollers/pre_reflective_process");
Object.defineProperty(exports, "add_pre_reflective_process", { enumerable: true, get: function () { return pre_reflective_process_1.add_pre_reflective_process; } });
Object.defineProperty(exports, "get_pre_reflective_process", { enumerable: true, get: function () { return pre_reflective_process_1.get_pre_reflective_process; } });
Object.defineProperty(exports, "del_pre_reflective_process", { enumerable: true, get: function () { return pre_reflective_process_1.del_pre_reflective_process; } });
Object.defineProperty(exports, "add_metodo_modelo", { enumerable: true, get: function () { return pre_reflective_process_1.add_metodo_modelo; } });
Object.defineProperty(exports, "get_pre_reflective_process_mod", { enumerable: true, get: function () { return pre_reflective_process_1.get_pre_reflective_process_mod; } });
Object.defineProperty(exports, "get_last_insert_process", { enumerable: true, get: function () { return pre_reflective_process_1.get_last_insert_process; } });
Object.defineProperty(exports, "mod_pre_reflective_process", { enumerable: true, get: function () { return pre_reflective_process_1.mod_pre_reflective_process; } });
Object.defineProperty(exports, "mod_metodos_modelos", { enumerable: true, get: function () { return pre_reflective_process_1.mod_metodos_modelos; } });
Object.defineProperty(exports, "get_metodos_recoleccion_analisis", { enumerable: true, get: function () { return pre_reflective_process_1.get_metodos_recoleccion_analisis; } });
Object.defineProperty(exports, "get_recoleccion_datos", { enumerable: true, get: function () { return pre_reflective_process_1.get_recoleccion_datos; } });
Object.defineProperty(exports, "get_model_analisis", { enumerable: true, get: function () { return pre_reflective_process_1.get_model_analisis; } });
Object.defineProperty(exports, "get_select_cargar_recurso", { enumerable: true, get: function () { return pre_reflective_process_1.get_select_cargar_recurso; } });
var reflective_process_1 = require("./page_contollers/reflective_process");
Object.defineProperty(exports, "add_reflective_process", { enumerable: true, get: function () { return reflective_process_1.add_reflective_process; } });
Object.defineProperty(exports, "get_reflective_process", { enumerable: true, get: function () { return reflective_process_1.get_reflective_process; } });
Object.defineProperty(exports, "del_reflective_process", { enumerable: true, get: function () { return reflective_process_1.del_reflective_process; } });
Object.defineProperty(exports, "add_metodo_modelo2", { enumerable: true, get: function () { return reflective_process_1.add_metodo_modelo2; } });
Object.defineProperty(exports, "get_reflective_process_mod", { enumerable: true, get: function () { return reflective_process_1.get_reflective_process_mod; } });
var property_1 = require("./page_contollers/property");
Object.defineProperty(exports, "get_properties", { enumerable: true, get: function () { return property_1.get_properties; } });
var data_flow_1 = require("./page_contollers/data_flow");
Object.defineProperty(exports, "get_data_flow", { enumerable: true, get: function () { return data_flow_1.get_data_flow; } });
var simulation_variable_1 = require("./page_contollers/simulation_variable");
Object.defineProperty(exports, "get_simulation_variable", { enumerable: true, get: function () { return simulation_variable_1.get_simulation_variable; } });
Object.defineProperty(exports, "add_simulation_variable", { enumerable: true, get: function () { return simulation_variable_1.add_simulation_variable; } });
Object.defineProperty(exports, "upd_simulation_variable", { enumerable: true, get: function () { return simulation_variable_1.upd_simulation_variable; } });
Object.defineProperty(exports, "del_simulation_variable", { enumerable: true, get: function () { return simulation_variable_1.del_simulation_variable; } });
var simulation_scenario_1 = require("./page_contollers/simulation_scenario");
Object.defineProperty(exports, "get_simulation_scenario", { enumerable: true, get: function () { return simulation_scenario_1.get_simulation_scenario; } });
Object.defineProperty(exports, "add_simulation_scenario", { enumerable: true, get: function () { return simulation_scenario_1.add_simulation_scenario; } });
Object.defineProperty(exports, "upd_simulation_scenario", { enumerable: true, get: function () { return simulation_scenario_1.upd_simulation_scenario; } });
Object.defineProperty(exports, "del_simulation_scenario", { enumerable: true, get: function () { return simulation_scenario_1.del_simulation_scenario; } });
var simulation_value_1 = require("./page_contollers/simulation_value");
Object.defineProperty(exports, "get_simulation_value", { enumerable: true, get: function () { return simulation_value_1.get_simulation_value; } });
Object.defineProperty(exports, "add_simulation_value", { enumerable: true, get: function () { return simulation_value_1.add_simulation_value; } });
Object.defineProperty(exports, "upd_simulation_value", { enumerable: true, get: function () { return simulation_value_1.upd_simulation_value; } });
Object.defineProperty(exports, "del_simulation_value", { enumerable: true, get: function () { return simulation_value_1.del_simulation_value; } });
var action_1 = require("./page_contollers/action");
Object.defineProperty(exports, "get_action", { enumerable: true, get: function () { return action_1.get_action; } });
Object.defineProperty(exports, "add_action", { enumerable: true, get: function () { return action_1.add_action; } });
Object.defineProperty(exports, "upd_action", { enumerable: true, get: function () { return action_1.upd_action; } });
Object.defineProperty(exports, "del_action", { enumerable: true, get: function () { return action_1.del_action; } });
var generate_model_1 = require("./page_contollers/generate_model");
Object.defineProperty(exports, "generate_model", { enumerable: true, get: function () { return generate_model_1.generate_model; } });
