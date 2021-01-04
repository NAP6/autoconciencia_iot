import { Application } from 'express';
import * as api from '../app/controller/controller-api';

export default function (app: Application) {
  app.get("/api/deployment_resources/", api.deployment_resources);
  app.post("/api/add_deployment_resources/", api.add_deployment_resources);
  app.post("/api/del_deployment_resources/", api.del_deployment_resources);
  app.post("/api/ask_deployment_resources_select/", api.ask_deployment_resources_select);
  app.post("/api/ask_deployment_resources/", api.ask_deployment_resources);
  app.post("/api/ask_input_arguments/", api.ask_input_arguments);
  app.get("/api/subjects/", api.subjects);
  app.post("/api/subjects_objects/", api.subjects_objects);
  app.post("/api/save_subjects_objects/", api.save_subjects_objects);
  app.post("/api/delete_subjects_objects/", api.delete_subjects_objects);
  app.post("/api/save_subjects/", api.save_subjects);
  app.post("/api/update_subjects/", api.update_subjects);
  app.post("/api/save_entity/", api.save_entity);
  app.post("/api/update_entity/", api.update_entity);
  app.post("/api/entity/", api.entity);
  app.get("/api/enumeracion/", api.enumeracion);
  app.post("/api/get_enumeracion/", api.get_enumeracion);
  app.get("/api/measurement_units/", api.measurement_units);
  app.post("/api/add_measurement_units/", api.add_measurement_units);
  app.post("/api/del_measurement_units/", api.del_measurement_units);
  app.post("/api/upd_measurement_units/", api.upd_measurement_units);
  app.get("/api/escales/", api.escales);
  app.post("/api/add_escales/", api.add_escales);
  app.post("/api/del_escales/", api.del_escales);
  app.post("/api/upd_escales/", api.upd_escales);
  app.get("/api/escalas_select"),api.get_escales_select;
  app.get("/api/decision_criteria/", api.decision_criteria);
  app.post("/api/add_decision_criteria/", api.add_decision_criteria);
  app.post("/api/del_decision_criteria/", api.del_decision_criteria);
  app.post("/api/upd_decision_criteria/", api.upd_decision_criteria);
  app.post("/api/umbral/", api.umbral);
  app.post("/api/get_umbral/", api.get_umbral);
  app.post("/api/add_umbral/", api.add_umbral);
  app.post("/api/del_umbral/", api.del_umbral);
  app.post("/api/upd_umbral/", api.upd_umbral);
  app.post("/api/aspects/", api.aspects);
  app.post("/api/add_aspects/", api.add_aspects);
  app.post("/api/del_aspects/", api.del_aspects);
  app.post("/api/add_metrica/",api.add_metrica);
  app.post("/api/get_metrica",api.get_metrica);
  app.post("/api/get_metrica_select",api.get_metrica_select);
  app.post("/api/del_metrica/",api.del_metrica);
  app.post("/api/add_accion/",api.add_accion);
  app.post("/api/get_accion",api.get_accion);
  app.post("/api/del_accion/", api.del_accion);
  app.get("/api/user_models/", api.user_models);
  app.get("/api/last_ObjectSubjectID/", api.last_ObjectSubjectID);
  app.get("/api/last_EntityID/", api.last_EntityID);
  app.get("/api/", api.home);
  app.get("/api/recurso_implementacion/", api.ri);
  app.post("/api/add_ri/", api.add_ri);
  app.post("/api/del_ri/", api.del_ri);
  app.post("/api/upd_ri/", api.upd_ri);
};
