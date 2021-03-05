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
function default_1(app, upload) {
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
    app.get("/deployment_resources", nv.loggedIn, nv.deployment_resources);
    app.get("/generate_model", nv.loggedIn, nv.generate_model);
    app.get("/proceso_pre_reflexivo", nv.loggedIn, nv.proceso_pre_reflexivo);
    app.post("/modificar_pre_reflexivos", nv.loggedIn, nv.modificar_pre_reflexivos);
    app.get("/procesos_reflexivos", nv.loggedIn, nv.procesos_reflexivos);
    app.post("/modificar_reflexivos", nv.loggedIn, nv.modificar_reflexivos);
    app.post("/save_new_model", nv.loggedIn, upload.single("file_modelo_xmi"), nv.save_new_model, nv.home);
    app
        .route("/")
        .get(nv.loggedIn, nv.home)
        .post(nv.loggedIn, nv.active_model, nv.home);
}
exports.default = default_1;
