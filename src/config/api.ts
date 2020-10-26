import { Application } from 'express';
import * as api from '../app/controller/controller-api';

export default function (app: Application) {
  app.get("/api/system/", api.system);
  app.get("/api/entity/", api.entity);
  app.get("/api/", api.home);
};
