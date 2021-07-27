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
exports.save_new_model = exports.select_model = exports.start_session = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
const fs = __importStar(require("fs"));
const xml2js_1 = require("xml2js");
const JSON2Architecture_1 = require("../../models/JSON2Architecture");
const selfAwarnessModels_2 = require("../../models/selfAwarnessModels");
function start_session(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.session.user) {
            next();
        }
        var db = new database2_1.database2();
        var email_user = req.body.email;
        var password_user = req.body.password;
        var user = new selfAwarnessModels_2.UserQ(-1, "", "", "");
        var rows = yield db.qwerty(user.toSqlSelect(["/@/MAIL/@/", "/@/PASSWRD/@/"], [email_user, password_user]));
        user = user.toObjectArray(rows);
        if (user.length == 1) {
            req.session.user = user[0];
            console.log(req.session.user);
            req.flash("error", "");
            req.flash("succes", "Bienvenido de vuelta");
            next();
        }
        else {
            req.flash("error", "El usuario no es valido");
            req.flash("succes", "");
            res.redirect("/login");
        }
    });
}
exports.start_session = start_session;
function select_model(req, res) {
    res.render("select_model", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
        page: "save_new_model",
    });
}
exports.select_model = select_model;
function save_new_model(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (req.session.user) {
            var nombre = req.body.nombre_modelo;
            var descripcion = req.body.descripcion_ecenario;
            var autor = req.body.autor_modelo;
            var user_id = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user._id;
            var db2 = new database2_1.database2();
            var json = [];
            try {
                const xml = fs.readFileSync(req.file.path);
                xml2js_1.parseString(xml, function (err, result) {
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
            var modelo = new selfAwarnessModels_1.SelfAwarnessQ(-1, nombre, descripcion, autor, JSON.stringify(json, null, "  "));
            var rows = yield db2.qwerty(modelo.toSqlInsert(["/@/USER/@/"], [user_id.toString()]));
            db2.architecture(arquitectura, rows.insertId.toString());
            req.session.active_model = {
                nombre: modelo.name,
                descripcion: modelo.description,
                modelID: rows.insertId.toString(),
            };
            next();
        }
        else {
            res.redirect("/login");
        }
    });
}
exports.save_new_model = save_new_model;
