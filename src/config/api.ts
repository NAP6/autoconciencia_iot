import { Application } from 'express';
import * as api from '../app/controller/controller-api';

export default function (app: Application) {
  app.get("/api/subjects/", api.subjects);
  app.post("/api/save_subjects/", api.save_subjects);
  app.post("/api/save_subjects/", api.save_entity);
  app.get("/api/entity/", api.entity);
  app.get("/api/measurement_units/", api.measurement_units);
  app.post("/api/add_measurement_units/", api.add_measurement_units);
  app.post("/api/del_measurement_units/", api.del_measurement_units);
  app.post("/api/upd_measurement_units/", api.upd_measurement_units);
  app.get("/api/escales/", api.escales);
  app.post("/api/add_escales/", api.add_escales);
  app.post("/api/del_escales/", api.del_escales);
  app.post("/api/upd_escales/", api.upd_escales);
  app.get("/api/decision_criteria/", api.decision_criteria);
  app.post("/api/add_decision_criteria/", api.add_decision_criteria);
  app.post("/api/del_decision_criteria/", api.del_decision_criteria);
  app.post("/api/upd_decision_criteria/", api.upd_decision_criteria);
  app.get("/api/user_models/", api.user_models);
  app.get("/api/last_ObjectSubjectID/", api.last_ObjectSubjectID);
  app.get("/api/last_EntityID/", api.last_EntityID);
  app.get("/api/", api.home);
};
