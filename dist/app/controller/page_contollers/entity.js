"use strict";
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
exports.update_entitys = exports.entitys = exports.entity = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
function entity(req, res) {
    res.render("entity", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.entity = entity;
function entitys(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var id = req.session.active_model.modelID;
            var db = new database2_1.database2();
            var seleccion = req.body.valorS;
            var system = req.body.systemID;
            var rows;
            ;
            if (seleccion == "Entidades Físicas") {
                rows = yield db.qwerty(new selfAwarnessModels_1.PhysicalEntityQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
            }
            else if (seleccion == "Nodos Cloud") {
                rows = yield db.qwerty(new selfAwarnessModels_1.CloudNodeQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
            }
            else if (seleccion == "Nodos Fog") {
                rows = yield db.qwerty(new selfAwarnessModels_1.FogNodeQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
            }
            else if (seleccion == "Gateway IoT") {
                rows = yield db.qwerty(new selfAwarnessModels_1.IoTGatewayQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
            }
            else if (seleccion == "Sensores") {
                rows = yield db.qwerty(new selfAwarnessModels_1.SensorQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
            }
            else if (seleccion == "Tags") {
                rows = yield db.qwerty(new selfAwarnessModels_1.TagQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
            }
            else if (seleccion == "Actuadores") {
                rows = yield db.qwerty(new selfAwarnessModels_1.ActuatorQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
            }
            else if (seleccion == "Red") {
                rows = yield db.qwerty(new selfAwarnessModels_1.NetworkQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
            }
            //var rows = await db.qwerty(objeto.toSqlSelect(["/@/MODEL/@/"], [id, seleccion]));
            //console.log(rows)
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.entitys = entitys;
function update_entitys(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
        }
    });
}
exports.update_entitys = update_entitys;
