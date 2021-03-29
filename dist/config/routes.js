"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const nv = __importStar(require("../app/controller/controller-navigation"));
const rt = __importStar(require("../app/controller/page_contollers"));
function default_1(app, upload) {
    app.get("/object", nv.loggedIn, nv.object);
    app.get("/pre_reflexivos", nv.loggedIn, nv.pre_reflexivos);
    app.get("/reflexivos", nv.loggedIn, nv.reflexivos);
    app.get("/self_awareness_processes", nv.loggedIn, nv.self_awareness_processes);
    app.get("/measurement_units", nv.loggedIn, nv.measurement_units);
    app.get("/scales", nv.loggedIn, nv.scales);
    app.get("/decision_criteria", nv.loggedIn, nv.decision_criteria);
    app.get("/deployment_resources", nv.loggedIn, nv.deployment_resources);
    app.get("/generate_model", nv.loggedIn, nv.generate_model);
    app.get("/proceso_pre_reflexivo", nv.loggedIn, nv.proceso_pre_reflexivo);
    app.post("/modificar_pre_reflexivos", nv.loggedIn, nv.modificar_pre_reflexivos);
    app.get("/procesos_reflexivos", nv.loggedIn, nv.procesos_reflexivos);
    app.post("/modificar_reflexivos", nv.loggedIn, nv.modificar_reflexivos);
    //Rutas Revisadas
    app.get("/login", rt.login);
    app.route("/singup").get(rt.singup).post(rt.singup_save);
    app
        .route("/start_session")
        .get(rt.select_model)
        .post(rt.start_session, rt.select_model);
    app.post("/save_new_model", upload.single("file_modelo_xmi"), rt.save_new_model, rt.loggedIn, rt.home);
    app
        .route("/")
        .get(rt.loggedIn, rt.home)
        .post(rt.active_model, rt.loggedIn, rt.home);
    app.get("/logout", rt.logout);
    app.route("/models").get(rt.loggedIn, rt.models)
        .post(upload.single("file_modelo_xmi"), rt.save_new_model, rt.loggedIn, rt.models);
    app.post("/update_model", rt.loggedIn, rt.update_model);
    app.get("/subject", rt.loggedIn, rt.subject);
    //Nuevos Cambioooos Profe
    app.get("/aspects", rt.loggedIn, rt.aspects);
    app.get("/metrics", rt.loggedIn, rt.metrics);
}
exports.default = default_1;
