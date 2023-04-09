"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = __importStar(require("../app/controller/controller-api"));
const rt = __importStar(require("../app/controller/page_contollers"));
function default_1(app) {
    app.post("/api/save_subjects/", api.save_subjects);
    app.post("/api/save_entity/", api.save_entity);
    app.post("/api/update_entity/", api.update_entity);
    app.post("/api/entity/", api.entity);
    app.get("/api/enumeracion/", api.enumeracion);
    app.get("/api/decision_criteria/", api.decision_criteria);
    app.post("/api/add_decision_criteria/", api.add_decision_criteria);
    app.post("/api/del_decision_criteria/", api.del_decision_criteria);
    app.post("/api/upd_decision_criteria/", api.upd_decision_criteria);
    app.post("/api/umbral/", api.umbral);
    app.post("/api/add_metrica/", api.add_metrica);
    app.post("/api/get_metrica", api.get_metrica);
    app.post("/api/get_metrica_select", api.get_metrica_select);
    app.post("/api/del_metrica/", api.del_metrica);
    app.post("/api/add_accion/", api.add_accion);
    app.post("/api/get_accion", api.get_accion);
    app.post("/api/del_accion/", api.del_accion);
    app.post("/api/upd_acciones_umbrales/", api.upd_acciones_umbrales);
    app.get("/api/last_ObjectSubjectID/", api.last_ObjectSubjectID);
    app.get("/api/last_EntityID/", api.last_EntityID);
    app.get("/api/", api.home);
    app.get("/api/recurso_implementacion/", api.ri);
    app.post("/api/add_ri/", api.add_ri);
    app.post("/api/del_ri/", api.del_ri);
    app.post("/api/upd_ri/", api.upd_ri);
    app.get("/api/procesos_pre_reflexive/", api.procesos_pre_reflexive);
    app.post("/api/procesos_pre_reflexive_id/", api.process_pre_reflexive_id);
    app.post("/api/add_process_pre_reflexive/", api.add_process_pre_reflexive);
    app.post("/api/del_process_pre_reflexive/", api.del_process_pre_reflexive);
    app.post("/api/properties/", api.properties);
    app.get("/api/procesos_reflexive/", api.procesos_reflexive);
    app.post("/api/add_metodo_modelo_reflexivos", api.add_metodo_modelo_reflexivos);
    app.post("/api/objetivos_sujetos", api.objetivos_sujetos);
    app.post("/api/get_metodo_aprendizaje/", api.get_metodo_aprendizaje);
    app.post("/api/add_escenario_simulacion/", api.add_escenario_simulacion);
    app.post("/api/ascenario_simulacion/", api.escenario_simulacion);
    app.post("/api/del_escenario_simulacion/", api.del_escenario_simulacion);
    app.post("/api/upd_escenario_simulacion/", api.upd_escenario_simulacion);
    app.post("/api/upd_variables_valor/", api.upd_variables_valor);
    app.post("/api/get_variable_simulacion/", api.get_variable_simulacion);
    app.get("/api/get_variable_simulacion_id/", api.get_variable_simulacion_id);
    app.post("/api/add_variable_simulacion/", api.add_variable_simulacion);
    app.post("/api/del_variable_simulacion/", api.del_variable_simulacion);
    app.post("/api/upd_variable_simulacion/", api.upd_variable_simulacion);
    app.post("/api/get_flujo_datos/", api.get_flujo_datos);
    //Rutas revisadas
    //Sujetos
    app.get("/api/user_models/", rt.user_models);
    app.get("/api/subjects/", rt.subjects);
    app.post("/api/update_subjects/", rt.update_subjects);
    app.post("/api/entitys/", rt.entitys);
    app.post("/api/subjects_objects/", rt.subjects_goals);
    app.post("/api/get_enumeracion/", rt.get_enumeracion);
    app.post("/api/save_subjects_objects/", rt.save_subjects_goal);
    app.post("/api/delete_subjects_objects/", rt.delete_subjects_goal);
    app.post("/api/subjects_aspects/", rt.subjects_aspects);
    //Aspectos
    app.route("/api/get_aspects/").post(rt.get_aspects);
    app.route("/api/get_aspects_ind/").get(rt.get_aspects_ind);
    app.post("/api/add_aspects/", rt.add_aspects);
    app.post("/api/mod_aspects/", rt.mod_aspecs);
    app.post("/api/del_aspects/", rt.del_aspects);
    app.post("/api/get_aspects_subjects", rt.get_aspects_objects);
    app.post("/api/get_aspects_objects_process", rt.get_aspects_objects_process);
    app.post("/api/del_aspects_objects", rt.del_aspects_objects);
    app.post("/api/add_relation_objects_aspects", rt.add_relation_objects_aspects);
    //Aspectos Colectivos
    app.post("/api/get_aspects_individuales", rt.get_aspects_individuales);
    app.post("/api/add_aspects_colective", rt.add_aspects_colective);
    app.route("/api/get_aspects_colective").get(rt.get_aspects_colective);
    app.post("/api/get_aspects_padres", rt.get_aspects_padres);
    app.post("/api/mod_aspects_colective", rt.mod_aspects_colective);
    app.post("/api/get_aspects_hijos", rt.get_aspects_hijos);
    app.post("/api/get_aspects_hijos_seleccionados", rt.get_aspects_hijos_seleccionados);
    //Generales
    //=====================================================================
    //Metricas
    app.post("/api/add_metrics/", rt.add_metrics);
    app.post("/api/add_metrics_aspects/", rt.add_metrics_aspects);
    app.post("/api/mod_metrics/", rt.mod_metrics);
    app.post("/api/del_metrics/", rt.del_metrics);
    app
        .route("/api/get_metrics/")
        .get(rt.get_metrics)
        .post(rt.get_metrics_aspects);
    app.post("/api/get_metrics_type", rt.get_metrics_type);
    app.post("/api/get_metrics_type_aspects", rt.get_metrics_type_aspects);
    //Recursos de implementacion
    app.get("/api/deployment_resources/", rt.deployment_resources);
    app.post("/api/add_deployment_resources/", rt.add_deployment_resources);
    app.post("/api/del_deployment_resources/", rt.del_deployment_resources);
    app.post("/api/mod_deployment_resources/", rt.mod_deployment_resources);
    app.post("/api/ask_deployment_resources_select/", rt.ask_deployment_resources_select);
    app.post("/api/ask_deployment_resources/", rt.ask_deployment_resources);
    //Unidades de Medida
    app.get("/api/get_measurement_units/", rt.get_measurement_units);
    app.post("/api/add_measurement_units/", rt.add_measurement_units);
    app.post("/api/del_measurement_units/", rt.del_measurement_units);
    app.post("/api/upd_measurement_units/", rt.upd_measurement_units);
    //Escalas
    app.get("/api/get_scales/", rt.get_scales);
    app.post("/api/add_scales/", rt.add_scales);
    app.post("/api/del_scales/", rt.del_scales);
    app.post("/api/upd_scales/", rt.upd_scales);
    //Criterios
    app.get("/api/get_criteria/", rt.get_criteria);
    app.post("/api/add_criteria/", rt.add_criteria);
    app.post("/api/del_criteria/", rt.del_criteria);
    app.post("/api/upd_criteria/", rt.upd_criteria);
    //Umbrales
    app.post("/api/get_umbral/", rt.get_umbral);
    app.post("/api/add_umbral/", rt.add_umbral);
    app.post("/api/del_umbral/", rt.del_umbral);
    app.post("/api/upd_umbral/", rt.upd_umbral);
    //Apis usadas para los procesos Pre-reflexivos
    app.post("/api/get_objects_aspects/", rt.get_objects_aspects);
    app.post("/api/add_pre_reflective_process", rt.add_pre_reflective_process);
    app.get("/api/get_pre_reflective_process", rt.get_pre_reflective_process);
    app.post("/api/del_pre_reflective_process", rt.del_pre_reflective_process);
    app.post("/api/get_pre_reflective_process_mod", rt.get_pre_reflective_process_mod);
    app.post("/api/get_metodos_recoleccion_analisis/", rt.get_metodos_recoleccion_analisis);
    app.post("/api/get_select_cargar_recurso", rt.get_select_cargar_recurso);
    app.post("/api/get_recoleccion_datos", rt.get_recoleccion_datos);
    app.post("/api/get_model_analisis", rt.get_model_analisis);
    app.post("/api/mod_pre_reflective_process", rt.mod_pre_reflective_process);
    app.post("/api/mod_metodos_modelos", rt.mod_metodos_modelos);
    app.get("/api/get_last_insert_process", rt.get_last_insert_process);
    //Metodo de aprendizaje procesos pre relfexivos
    app.post("/api/add_metodo_modelo", rt.add_metodo_modelo);
    //API PROPIEDADES
    app.post("/api/get_properties", rt.get_properties);
    //API FLUJO DATOS
    app.post("/api/get_data_flow", rt.get_data_flow);
    //Apis usadas para los procesos reflexivos
    app.post("/api/add_reflective_process", rt.add_reflective_process);
    app.get("/api/get_reflective_process", rt.get_reflective_process);
    app.post("/api/del_reflective_process", rt.del_reflective_process);
    //Metodo de aprendizaje
    app.post("/api/add_metodo_modelo2", rt.add_metodo_modelo2);
    //	Variables de simulacion para el metodo de procesos reflexivos
    app.post("/api/get_simulation_variable", rt.get_simulation_variable);
    app.post("/api/add_simulation_variable", rt.add_simulation_variable);
    app.post("/api/upd_simulation_variable", rt.upd_simulation_variable);
    app.post("/api/del_simulation_variable", rt.del_simulation_variable);
    //	Metadatos para el metodo de procesos reflexivos
    app.post("/api/get_metadata", rt.get_metadata);
    //	Escenarios de simulacion para el metodo de procesos reflexivos
    app.post("/api/get_simulation_scenario", rt.get_simulation_scenario);
    app.post("/api/add_simulation_scenario", rt.add_simulation_scenario);
    app.post("/api/upd_simulation_scenario", rt.upd_simulation_scenario);
    app.post("/api/del_simulation_scenario", rt.del_simulation_scenario);
    //	Valor de simulacion para el metodod de procesos reflexivos
    app.post("/api/get_simulation_value", rt.get_simulation_value);
    app.post("/api/add_simulation_value", rt.add_simulation_value);
    app.post("/api/upd_simulation_value", rt.upd_simulation_value);
    app.post("/api/del_simulation_value", rt.del_simulation_value);
    //	Mapo de parametros
    app.post("/api/ask_input_arguments/", rt.ask_input_arguments);
    app.post("/api/add_mapeo_parametros", rt.add_mapeo_parametros);
    //	Acciones Procesos
    app.post("/api/get_action", rt.get_action);
    app.post("/api/add_action", rt.add_action);
    app.post("/api/upd_action", rt.upd_action);
    app.post("/api/del_action", rt.del_action);
}
exports.default = default_1;
