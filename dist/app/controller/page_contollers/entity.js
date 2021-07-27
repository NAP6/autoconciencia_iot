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
exports.get_objects_aspects = exports.update_entitys = exports.entitys = exports.entity = void 0;
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
            var flag = false;
            if (seleccion == "Entidades Fisicas") {
                rows = yield db.qwerty(new selfAwarnessModels_1.PhysicalEntityQ(-1, "", "").toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [id, system]));
            }
            else if (seleccion == "Nodos Cloud") {
                rows = yield db.qwerty(new selfAwarnessModels_1.CloudNodeQ(-1, "", "").toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [id, system]));
                flag = true;
            }
            else if (seleccion == "Nodos Fog") {
                rows = yield db.qwerty(new selfAwarnessModels_1.FogNodeQ(-1, "", "").toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [id, system]));
                flag = true;
            }
            else if (seleccion == "Gateway IoT") {
                rows = yield db.qwerty(new selfAwarnessModels_1.IoTGatewayQ(-1, "", "").toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [id, system]));
                flag = true;
            }
            else if (seleccion == "Sensores") {
                rows = yield db.qwerty(new selfAwarnessModels_1.SensorQ(-1, "", "").toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [id, system]));
                flag = true;
            }
            else if (seleccion == "Tags") {
                rows = yield db.qwerty(new selfAwarnessModels_1.TagQ(-1, "", "").toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [id, system]));
                flag = true;
            }
            else if (seleccion == "Actuadores") {
                rows = yield db.qwerty(new selfAwarnessModels_1.ActuatorQ(-1, "", "").toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [id, system]));
                flag = true;
            }
            else if (seleccion == "Red") {
                rows = yield db.qwerty(new selfAwarnessModels_1.NetworkQ(-1, "", "").toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [id, system]));
            }
            if (flag) {
                var aux = rows;
                var obj = new selfAwarnessModels_1.EntityQ(-1, "", "");
                for (var i = 0; i < aux.length; i++) {
                    var rows2 = yield db.qwerty(obj.toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/", "/@/TYPE/@/", "/@/OBJECT/@/"], [
                        id,
                        system,
                        "'DataBase','Middleware','NetworkInterface','Broker','Application','API'",
                        aux[i].id,
                    ]));
                    rows = rows.concat(rows2);
                }
            }
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
function get_objects_aspects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var idA = req.body.aspecto;
            var categoriT = req.body.categoria;
            var idS = req.body.sujeto;
            var modelID = req.session.active_model.modelID;
            var newCat = "";
            if (categoriT == "Entidades Físicas") {
                newCat = "PhysicalEntity";
            }
            else if (categoriT == "Nodos Cloud") {
                newCat = "CloudNode";
            }
            else if (categoriT == "Nodos Fog") {
                newCat = "FogNode";
            }
            else if (categoriT == "Gateway IoT") {
                newCat = "IoTGateway";
            }
            else if (categoriT == "Sensores") {
                newCat = "Sensor";
            }
            else if (categoriT == "Tags") {
                newCat = "Tag";
            }
            else if (categoriT == "Actuadores") {
                newCat = "Actuator";
            }
            else if (categoriT == "Red") {
                newCat = "Network";
            }
            var rows = yield db.qwerty(`SELECT 
    obj.obj_id as id,
    obj.obj_nombre as nombre,
    obj.obj_tipo as tipo
	 FROM
    objeto obj, 
    aspectoautoconsciencia_objeto asp_obj,
    aspectoautoconsciencia asp,
    sujeto suj,
    sujeto_objeto as suj_obj
	WHERE
    asp_obj.ma_id=${modelID} AND
    asp.ma_id=${modelID} AND
    obj.ma_id=${modelID} AND
    suj.ma_id= ${modelID} AND
    suj_obj.ma_id=${modelID} AND
    suj.suj_id=${idS} AND
    suj_obj.suj_id=suj.suj_id AND
    suj_obj.obj_id=obj.obj_id AND
    asp.aa_id=${idA} AND
    asp_obj.aa_id=asp.aa_id AND															
    asp_obj.obj_id=obj.obj_id`);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_objects_aspects = get_objects_aspects;
