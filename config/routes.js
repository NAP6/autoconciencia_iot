export default function (app, upload) {
  app.get("/login", nv.login);
  app.get("/singup", nv.singup);
  app.get("/", nv.loggendIn, nv.home);
  app.get("/models", nv.loggendIn, nv.models);
  app.get("/subject", nv.loggendIn, nv.subject);
  app.get("/object", nv.loggendIn, nv.object);
  app.get(
    "/self-awareness_processes",
    nv.loggendIn,
    nv.self - awareness_processes
  );
  app.get("/measurement_units", nv.loggendIn, nv.measurement_units);
  app.get("/scales", nv.loggendIn, nv.scales);
  app.get("/decision", nv.loggendIn, nv.decision);
  app.get("/formulas", nv.loggendIn, nv.formulas);
  app.get("/functions", nv.loggendIn, nv.functions);
  app.get("/service", nv.loggendIn, nv.service);
  app.get("/generate_model", nv.loggendIn, nv.generate_model);

  app.post(
    "/save_new_model",
    nv.loggedIn,
    upload.single("model_file"),
    nv.save_new_model,
    nv.home
  );

  app.post(
    "/signup",
  );
};
