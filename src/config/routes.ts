import { Application } from "express";
import { Multer } from "multer";
import * as nv from "../app/controller/controller-navigation";
import * as rt from "../app/controller/page_contollers";

export default function (app: Application, upload: Multer) {
  app.get("/object", nv.loggedIn, nv.object);
  app.get("/pre_reflexivos", nv.loggedIn, nv.pre_reflexivos);
  app.get("/reflexivos", nv.loggedIn, nv.reflexivos);
  app.get(
    "/self_awareness_processes",
    nv.loggedIn,
    nv.self_awareness_processes
  );
  app.get("/measurement_units", nv.loggedIn, nv.measurement_units);
  app.get("/scales", nv.loggedIn, nv.scales);
  app.get("/decision_criteria", nv.loggedIn, nv.decision_criteria);
  app.get("/deployment_resources", nv.loggedIn, nv.deployment_resources);
  app.get("/generate_model", nv.loggedIn, nv.generate_model);
  app.get("/proceso_pre_reflexivo", nv.loggedIn, nv.proceso_pre_reflexivo);
  app.post(
    "/modificar_pre_reflexivos",
    nv.loggedIn,
    nv.modificar_pre_reflexivos
  );
  app.get("/procesos_reflexivos", nv.loggedIn, nv.procesos_reflexivos);
  app.post("/modificar_reflexivos", nv.loggedIn, nv.modificar_reflexivos);

  //Rutas Revisadas
  app.get("/login", rt.login);
  app.route("/singup").get(rt.singup).post(rt.singup_save);
  app
    .route("/start_session")
    .get(rt.select_model)
    .post(rt.start_session, rt.select_model);
  app.post(
    "/save_new_model",
    upload.single("file_modelo_xmi"),
    rt.save_new_model,
    rt.loggedIn,
    rt.home
  );
  app
    .route("/")
    .get(rt.loggedIn, rt.home)
    .post(rt.active_model, rt.loggedIn, rt.home);
  app.get("/logout", rt.logout);
  app
    .route("/models")
    .get(rt.loggedIn, rt.models)
    .post(
      upload.single("file_modelo_xmi"),
      rt.save_new_model,
      rt.loggedIn,
      rt.models
    );
  app.post("/update_model", rt.loggedIn, rt.update_model);
  app.get("/subject", rt.loggedIn, rt.subject);
  //Nuevos Cambioooos Profe
  app.get("/aspects", rt.loggedIn, rt.aspects);
  app.get("/metrics", rt.loggedIn, rt.metrics);
}
