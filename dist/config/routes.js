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
    app.get("/singup", nv.singup);
    app.get("/models", nv.loggedIn, nv.models);
    app.get("/subject", nv.loggedIn, nv.subject);
    app.get("/object", nv.loggedIn, nv.object);
    //app.get("/self-awareness_processes", nv.loggedIn, nv.self-awareness_processes);
    app.get("/measurement_units", nv.loggedIn, nv.measurement_units);
    app.get("/scales", nv.loggedIn, nv.scales);
    app.get("/decision_criteria", nv.loggedIn, nv.decision);
    app.get("/formulas", nv.loggedIn, nv.formulas);
    app.get("/functions", nv.loggedIn, nv.functions);
    //app.get("/service", nv.loggedIn, nv.service);
    app.get("/generate_model", nv.loggedIn, nv.generate_model);
    app.post("/save_new_model", nv.loggedIn, upload.single("model_file"), nv.save_new_model, nv.home);
    //app.post("/signup",);
    app.get("/", nv.loggedIn, nv.home);
}
exports.default = default_1;
;
