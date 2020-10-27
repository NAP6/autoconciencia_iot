import { Application } from 'express';
import { Multer } from 'multer';
import * as nv from '../app/controller/controller-navigation';

export default function (app: Application, upload: Multer) {
  app.get("/login", nv.login);
  app.post("/start_session", nv.start_session, nv.home);
  app.get('/logout',nv.logout,nv.login);
  app.get("/singup", nv.singup);
  app.get("/modelsV/create_model", nv.loggedIn, nv.models);
  app.get("/subject", nv.loggedIn, nv.subject);
  app.get("/object", nv.loggedIn, nv.object);
  //app.get("/self-awareness_processes", nv.loggedIn, nv.self-awareness_processes);
  app.get("/units_of_measure", nv.loggedIn, nv.measurement_units);
  app.get("/scales", nv.loggedIn, nv.scales);
  app.get("/decision_criteria", nv.loggedIn, nv.decision);
  app.get("/formulas", nv.loggedIn, nv.formulas);
  app.get("/calcule_functions", nv.loggedIn, nv.functions);
  //app.get("/service", nv.loggedIn, nv.service);
  app.get("/generate_model", nv.loggedIn, nv.generate_model);

  app.post(
    "/save_new_model",
    nv.loggedIn,
    upload.single("model_file"),
    nv.save_new_model,
    nv.home
  );

  //app.post("/signup",);
  app.get("/", nv.loggedIn, nv.home);
};
