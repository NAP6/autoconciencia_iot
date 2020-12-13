import { Application } from "express";
import { Multer } from "multer";
import * as nv from "../app/controller/controller-navigation";

export default function (app: Application, upload: Multer) {
  app.get("/login", nv.login);
  app.get("/logout", nv.logout);
  app.route("/singup").get(nv.singup).post(nv.singup_save);
  app.post("/start_session", nv.start_session, nv.select_model);
  app.get("/models", nv.loggedIn, nv.models);
  app.post("/update_model", nv.loggedIn, nv.update_model);
  app.get("/subject", nv.loggedIn, nv.subject);
  app.get("/object", nv.loggedIn, nv.object);
  app.get("/pre_reflexivos", nv.loggedIn, nv.pre_reflexivos);
  app.get("/reflexivos", nv.loggedIn, nv.reflexivos);
  app.get("/self_awareness_processes", nv.loggedIn, nv.self_awareness_processes);
  app.get("/measurement_units", nv.loggedIn, nv.measurement_units);
  app.get("/scales", nv.loggedIn, nv.scales);
  app.get("/decision_criteria", nv.loggedIn, nv.decision_criteria);
  app.get("/formulas", nv.loggedIn, nv.formulas);
  app.get("/calculation_functions", nv.loggedIn, nv.calculation_functions);
  app.get("/calculation_services", nv.loggedIn, nv.calculation_services);
  app.get("/generate_model", nv.loggedIn, nv.generate_model);

  app.post(
    "/save_new_model",
    nv.loggedIn,
    upload.single("file_modelo_xmi"),
    nv.save_new_model,
    nv.home
  );

  app
    .route("/")
    .get(nv.loggedIn, nv.home)
    .post(nv.loggedIn, nv.active_model, nv.home);
}



