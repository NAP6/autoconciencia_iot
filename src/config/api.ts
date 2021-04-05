import { Application } from "express";
import * as api from "../app/controller/controller-api";
import * as rt from "../app/controller/page_contollers";

export default function (app: Application) {
  app.post("/api/ask_input_arguments/", api.ask_input_arguments);

  app.post("/api/save_subjects/", api.save_subjects);
  app.post("/api/save_entity/", api.save_entity);
  app.post("/api/update_entity/", api.update_entity);
  app.post("/api/entity/", api.entity);
  app.get("/api/enumeracion/", api.enumeracion);
  //app.get("/api/measurement_units/", api.measurement_units);
  //app.post("/api/add_measurement_units/", api.add_measurement_units);
  // app.post("/api/del_measurement_units/", api.del_measurement_units);
  // app.post("/api/upd_measurement_units/", api.upd_measurement_units);
  // app.get("/api/escales/", api.escales);
  // app.post("/api/add_escales/", api.add_escales);
  //app.post("/api/del_escales/", api.del_escales);
  //app.post("/api/upd_escales/", api.upd_escales);
  //app.get("/api/escalas_select"), api.get_escales_select;
  app.get("/api/decision_criteria/", api.decision_criteria);
  app.post("/api/add_decision_criteria/", api.add_decision_criteria);
  app.post("/api/del_decision_criteria/", api.del_decision_criteria);
  app.post("/api/upd_decision_criteria/", api.upd_decision_criteria);
  app.post("/api/umbral/", api.umbral);
  // app.post("/api/get_umbral/", api.get_umbral);
  // app.post("/api/add_umbral/", api.add_umbral);
  // app.post("/api/del_umbral/", api.del_umbral);
  //app.post("/api/upd_umbral/", api.upd_umbral);
  //app.post("/api/aspects/", api.aspects);
  //app.post("/api/add_aspects/", api.add_aspects);
  //app.post("/api/del_aspects/", api.del_aspects);
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
  app.post("/api/mod_process_pre_reflexive", api.mod_process_pre_reflexive);
  app.post("/api/properties/", api.properties);
  app.post("/api/add_metodo_modelo", api.add_metodo_modelo);
  app.post("/api/add_mapeo_parametros", api.add_mapeo_parametros);
  app.get("/api/procesos_reflexive/", api.procesos_reflexive);
  app.post(
    "/api/add_metodo_modelo_reflexivos",
    api.add_metodo_modelo_reflexivos
  );
  app.post("/api/objetivos_sujetos", api.objetivos_sujetos);
  app.post("/api/get_metodo_aprendizaje/", api.get_metodo_aprendizaje);
  app.post("/api/add_escenario_simulacion/", api.add_escenario_simulacion);
  app.post("/api/ascenario_simulacion/", api.escenario_simulacion);
  app.post("/api/del_escenario_simulacion/", api.del_escenario_simulacion);
  app.post("/api/upd_escenario_simulacion/", api.upd_escenario_simulacion);
  app.post("/api/get_variables_valor/", api.get_variables_valor);
  app.post("/api/add_variables_valor/", api.add_variables_valor);
  app.post("/api/del_variables_valor/", api.del_variables_valor);
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
  app.route("/api/get_aspects/").get(rt.get_aspects);
  app.post("/api/add_aspects/", rt.add_aspects);
  app.post("/api/mod_aspects/", rt.mod_aspecs);
  app.post("/api/del_aspects/", rt.del_aspects);
  app.post("/api/get_aspects_subjects", rt.get_aspects_objects);
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
  //Aspectos
  //app.route("/api/get_aspects/").get(rt.get_aspects);
  //app.post("/api/add_aspects/", rt.add_aspects);
  //app.post("/api/mod_aspects/", rt.mod_aspecs);
  //app.post("/api/del_aspects/", rt.del_aspects);
  //Recursos de implementacion
  app.get("/api/deployment_resources/", rt.deployment_resources);
  app.post("/api/add_deployment_resources/", rt.add_deployment_resources);
  app.post("/api/del_deployment_resources/", rt.del_deployment_resources);
  app.post(
    "/api/ask_deployment_resources_select/",
    rt.ask_deployment_resources_select
  );
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
}
