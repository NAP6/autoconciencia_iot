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
exports.del_aspects_objects = exports.del_aspects = exports.mod_aspecs = exports.add_relation_objects_aspects = exports.add_aspects = exports.get_aspects = exports.get_aspects_objects_process = exports.get_aspects_objects = exports.aspects = void 0;
const database2_1 = require("../../data/database2");
const SelfAwarenessAspectQ_1 = require("../../models/selfAwarness/qwertyModels/SelfAwarenessAspectQ");
function aspects(req, res) {
    res.render("aspects", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.aspects = aspects;
function get_aspects_objects(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modeloID = (_b = req.session) === null || _b === void 0 ? void 0 : _b.active_model.modelID;
            var system = req.body.systemID;
            //   var categoriT = req.body.category;
            /* if (categoriT) {
              var system = req.body.systemID;
              var newCat: string = "";
              if (categoriT == "Entidades Físicas") {
                newCat = "PhysicalEntity";
              } else if (categoriT == "Nodos Cloud") {
                newCat = "CloudNode";
              } else if (categoriT == "Nodos Fog") {
                newCat = "FogNode";
              } else if (categoriT == "Gateway IoT") {
                newCat = "IoTGateway";
              } else if (categoriT == "Sensores") {
                newCat = "Sensor";
              } else if (categoriT == "Tags") {
                newCat = "Tag";
              } else if (categoriT == "Actuadores") {
                newCat = "Actuator";
              } else if (categoriT == "Red") {
                newCat = "Network";
              }*/
            var rows = yield db.qwerty(`SELECT asp_obj.obj_id as id,
	      	    			       obj.obj_nombre as nombre, 
	      	                                obj.obj_tipo as tipo
	      					FROM 
	      				     aspectoautoconsciencia_objeto as asp_obj,
	      	                             objeto as obj 
	      	                        where 
	      	                             asp_obj.obj_id=obj.obj_id AND
	      	                             asp_obj.ma_id=obj.ma_id AND 
	      	                             asp_obj.aa_id=${system}`);
            res.json(rows);
        }
        else {
            res.json({ error: "Debe iniciar sesion para poder usar la api" });
        }
    });
}
exports.get_aspects_objects = get_aspects_objects;
function get_aspects_objects_process(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modeloID = (_b = req.session) === null || _b === void 0 ? void 0 : _b.active_model.modelID;
            var system = req.body.systemID;
            //   var categoriT = req.body.category;
            /* if (categoriT) {
              var system = req.body.systemID;
              var newCat: string = "";
              if (categoriT == "Entidades Físicas") {
                newCat = "PhysicalEntity";
              } else if (categoriT == "Nodos Cloud") {
                newCat = "CloudNode";
              } else if (categoriT == "Nodos Fog") {
                newCat = "FogNode";
              } else if (categoriT == "Gateway IoT") {
                newCat = "IoTGateway";
              } else if (categoriT == "Sensores") {
                newCat = "Sensor";
              } else if (categoriT == "Tags") {
                newCat = "Tag";
              } else if (categoriT == "Actuadores") {
                newCat = "Actuator";
              } else if (categoriT == "Red") {
                newCat = "Network";
              }*/
            var rows = yield db.qwerty(`SELECT 
	          					DISTINCT asp.aa_id as idAspecto,
	      	    				asp.aa_nombre as nombreAspecto
	      	    			FROM 
	      	     				aspectoautoconsciencia asp, 
	      					sujeto suj
	      	    			WHERE   
	      	                		suj.suj_id=${system} AND 
	      	                		asp.ma_id=${modeloID} AND
	      					suj.ma_id=${modeloID} AND
	      					suj.suj_id=asp.suj_id`);
            res.json(rows);
        }
        else {
            res.json({ error: "Debe iniciar sesion para poder usar la api" });
        }
    });
}
exports.get_aspects_objects_process = get_aspects_objects_process;
function get_aspects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modelID = req.session.active_model.modelID;
            var aspects = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(-1, "", "", -1, "");
            var rows = yield db.qwerty(aspects.toSqlSelect(["/@/MODEL/@/"], [modelID]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_aspects = get_aspects;
function add_aspects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAspect = req.body;
            console.log(newAspect);
            var modelID = req.session.active_model.modelID;
            var aspect = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(-1, newAspect.name, newAspect.description, newAspect.weigth, newAspect.type);
            aspect.active = aspect.active;
            var rows = yield db.qwerty(aspect.toSqlInsert(["/@/OBJECT/@/", "/@/SUBJECT/@/", "/@/MODEL/@/"], [newAspect.obj_id, newAspect.suj_id, modelID]));
            aspect.id = rows.insertId;
            yield add_relation_objects_aspects_intern(aspect.id, modelID, newAspect.arr_entity);
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_aspects = add_aspects;
function add_relation_objects_aspects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            yield add_relation_objects_aspects_intern(req.body.aa_id, req.session.active_model.modelID, req.body.arr_entity);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_relation_objects_aspects = add_relation_objects_aspects;
function add_relation_objects_aspects_intern(aa_id, modelID, arr_obj) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        for (var i = 0; i < arr_obj.length; i++) {
            yield db.qwerty(`INSERT INTO aspectoautoconsciencia_objeto (aa_id, obj_id, ma_id) values (${aa_id}, ${arr_obj[i]}, ${modelID})`);
        }
    });
}
function mod_aspecs(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAspect = req.body;
            var modelID = req.session.active_model.modelID;
            var aspect = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(newAspect.id, newAspect.name, newAspect.description, newAspect.weigth, newAspect.tipo);
            aspect.active = newAspect.active;
            yield db.qwerty(aspect.toSqlUpdate(["/@/OBJECT/@/", "/@/MODEL/@/"], [newAspect.objetivo, modelID]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.mod_aspecs = mod_aspecs;
function del_aspects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAspect = req.body;
            var aspect = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(newAspect.id, "", "", -1, "");
            yield db.qwerty(aspect.toSqlDelete(["", "", ""]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_aspects = del_aspects;
function del_aspects_objects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAspect = req.body;
            yield db.qwerty(`DELETE FROM aspectoautoconsciencia_objeto WHERE aa_id=${newAspect.aa_id} `);
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.del_aspects_objects = del_aspects_objects;
