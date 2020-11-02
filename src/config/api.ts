import { Application } from 'express';
import * as api from '../app/controller/controller-api';

export default function (app: Application) {
  app.get("/api/subjects/", api.subjects);
  app.post("/api/save_subjects/", api.save_subjects);
  app.get("/api/entity/", api.entity);
  app.get("/api/measurement_units/", api.measurement_units);
  app.get("/api/escales/", api.escales);
  app.get("/api/decision_criteria/", api.decision_criteria);
  app.get("/api/user_models/", api.user_models);
  app.get("/api/last_ObjectSubjectID/", api.last_ObjectSubjectID);
  app.get("/api/", api.home);
};
