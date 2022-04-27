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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = exports.active_model = exports.save_new_model = exports.generate_model = exports.procesos_reflexivos = exports.modificar_reflexivos = exports.modificar_pre_reflexivos = exports.proceso_pre_reflexivo = exports.deployment_resources = exports.decision_criteria = exports.scales = exports.measurement_units = exports.self_awareness_processes = exports.reflexivos = exports.pre_reflexivos = exports.object = exports.subject = exports.update_model = exports.models = exports.select_model = exports.start_session = exports.singup_save = exports.singup = exports.logout = exports.login = exports.loggedIn = void 0;
const database_1 = require("../data/database");
const database2_1 = require("../data/database2");
const fs = __importStar(require("fs"));
const xml2js_1 = require("xml2js");
const JSON2Architecture_1 = require("../models/JSON2Architecture");
const SelfAwarnessQ_1 = require("../models/selfAwarness/qwertyModels/SelfAwarnessQ");
function loggedIn(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect("/login");
    }
}
exports.loggedIn = loggedIn;
function login(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        res.redirect("/home");
        req.flash("error");
        req.flash("succes");
    }
    else {
        res.render("login", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            session: req.session,
        });
    }
}
exports.login = login;
function logout(req, res, next) {
    var _a, _b;
    (_a = req.session) === null || _a === void 0 ? true : delete _a.user;
    (_b = req.session) === null || _b === void 0 ? true : delete _b.active_model;
    res.redirect("/login");
}
exports.logout = logout;
function singup(req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        res.redirect("/home");
    }
    else {
        res.render("singup", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            session: req.session,
        });
    }
}
exports.singup = singup;
function singup_save(req, res, next) {
    if (req.session.user) {
        //Guardar
        next();
    }
    else {
        res.redirect("/login");
    }
}
exports.singup_save = singup_save;
//Inicia sesion de usuario
function start_session(req, res, next) {
    var db = new database_1.mysql_connector();
    var email_user = req.body.email;
    var password_user = req.body.password;
    db.validateUser(email_user, password_user, (cont) => {
        if (cont == 1) {
            db.getUser(email_user, password_user, (user) => {
                req.session.user = user;
                req.flash("error", "");
                req.flash("succes", "Bienvenido de vuelta");
                next();
            });
        }
        else {
            req.flash("error", "El usuario no es valido");
            req.flash("succes", "");
            res.redirect("/");
        }
    });
}
exports.start_session = start_session;
function select_model(req, res) {
    res.render("select_model", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.select_model = select_model;
function models(req, res) {
    res.render("models", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.models = models;
function update_model(req, res) {
    var db = new database_1.mysql_connector();
    var idModel = req.body.id_modelo_update;
    var nameModel = req.body.nombre_modelo_update;
    var descripcionModel = req.body.descripcion_ecenario_update;
    var activo = (req.body.activoModelo != undefined).toString();
    db.update_modal(idModel, nameModel, descripcionModel, activo);
    res.render("models", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.update_model = update_model;
function subject(req, res) {
    res.render("subject", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.subject = subject;
function object(req, res) {
    res.render("object", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.object = object;
function pre_reflexivos(req, res) {
    res.render("pre_reflexivos", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.pre_reflexivos = pre_reflexivos;
function reflexivos(req, res) {
    res.render("reflexivos", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.reflexivos = reflexivos;
function self_awareness_processes(req, res) {
    res.render("self_awareness_processes", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.self_awareness_processes = self_awareness_processes;
function measurement_units(req, res) {
    res.render("measurement_units", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.measurement_units = measurement_units;
function scales(req, res) {
    res.render("scales", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.scales = scales;
function decision_criteria(req, res) {
    res.render("decision_criteria", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.decision_criteria = decision_criteria;
function deployment_resources(req, res) {
    res.render("deployment_resources", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.deployment_resources = deployment_resources;
function proceso_pre_reflexivo(req, res) {
    res.render("proceso_pre_reflexivo", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.proceso_pre_reflexivo = proceso_pre_reflexivo;
function modificar_pre_reflexivos(req, res) {
    var _a;
    var id = req.body.proceso_seleccionado;
    var idUser = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user.userID;
    var db = new database_1.mysql_connector();
    db.getUser_procesos_pre_reflexive_id(idUser, id, (jsonEscala) => {
        res.render("modificar_pre_reflexivos", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            modificar: jsonEscala,
            session: req.session,
        });
    });
}
exports.modificar_pre_reflexivos = modificar_pre_reflexivos;
function modificar_reflexivos(req, res) {
    var _a;
    var id = req.body.proceso_reflexivo_seleccionado;
    var idUser = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user.userID;
    var db = new database_1.mysql_connector();
    db.getUser_procesos_reflexive_id(idUser, id, (jsonEscala) => {
        res.render("modificar_reflexivos", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            modificar: jsonEscala,
            session: req.session,
        });
    });
}
exports.modificar_reflexivos = modificar_reflexivos;
function procesos_reflexivos(req, res) {
    res.render("procesos_reflexivos", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.procesos_reflexivos = procesos_reflexivos;
function generate_model(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        var modeloID = (_a = req.session) === null || _a === void 0 ? void 0 : _a.active_model.modelID;
        var db = new database2_1.database2();
        var modelo = new SelfAwarnessQ_1.SelfAwarnessQ(-1, "", "", "", "");
        var rows = yield db.qwerty(modelo.toSqlInsert(["/@/MODEL/@/"], [modeloID.toString()]));
        modelo = modelo.toObjectArray(rows)[0];
        res.render("generate_model", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            session: req.session,
            model: JSON.stringify(modelo, null, "  "),
        });
    });
}
exports.generate_model = generate_model;
function save_new_model(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (req.session.user) {
            var nombre = req.body.nombre_modelo;
            var descripcion = req.body.descripcion_ecenario;
            var autor = req.body.autor_modelo;
            var user_id = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user.userID;
            var db = new database_1.mysql_connector();
            //######################
            var db2 = new database2_1.database2();
            var json = [];
            try {
                const xml = fs.readFileSync(req.file.path);
                (0, xml2js_1.parseString)(xml, function (err, result) {
                    if (err)
                        throw err;
                    json = result;
                });
                fs.unlink(req.file.path, (err) => {
                    if (err)
                        throw err;
                });
            }
            catch (error) {
                console.log("No se ha ingresado ningun valor");
            }
            var arquitectura = new JSON2Architecture_1.JSON2Architecture(json);
            var modelo = new SelfAwarnessQ_1.SelfAwarnessQ(-1, nombre, descripcion, autor, JSON.stringify(json, null, "  "));
            var rows = yield db2.qwerty(modelo.toSqlInsert(["/@/USER/@/"], [user_id.toString()]));
            db2.architecture(arquitectura, rows.insertId.toString());
            req.session.active_model = {
                nombre: modelo.name,
                descripcion: modelo.description,
                modelID: rows.insertId.toString(),
            };
            //#####################################################
            next();
        }
        else {
            res.redirect("/login");
        }
    });
}
exports.save_new_model = save_new_model;
function active_model(req, res, next) {
    var db = new database_1.mysql_connector();
    db.getModel(req.body.select_model, (active_model) => {
        req.session.active_model = active_model;
        next();
    });
}
exports.active_model = active_model;
function home(req, res) {
    res.render("principal", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.home = home;
