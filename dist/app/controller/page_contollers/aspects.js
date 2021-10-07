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
exports.get_aspects_hijos_seleccionados = exports.get_aspects_hijos = exports.mod_aspects_colective = exports.get_aspects_padres = exports.get_aspects_colective = exports.add_relation_aspects_indi_aspects_colec = exports.add_aspects_colective = exports.get_aspects_individuales = exports.del_aspects_objects = exports.del_aspects = exports.mod_aspecs = exports.add_relation_objects_aspects = exports.add_aspects = exports.get_aspects_ind = exports.get_aspects = exports.get_aspects_objects_process = exports.get_aspects_objects = exports.aspects_collective = exports.aspects = void 0;
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
function aspects_collective(req, res) {
    res.render("aspects_collective", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.aspects_collective = aspects_collective;
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
            var types = req.body.types;
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
            var rows;
            if (types) {
                rows = yield db.qwerty(`SELECT 
	          				DISTINCT asp.aa_id as idAspecto,
	      	    				asp.aa_nombre as nombreAspecto
	      	    			FROM 
	      	     				aspectoautoconsciencia asp, 
	      					sujeto suj
	      	    			WHERE   
	      	                		suj.suj_id=${system} AND 
	      	                		asp.ma_id=${modeloID} AND
	      					suj.ma_id=${modeloID} AND
	      					suj.suj_id=asp.suj_id AND
	      					asp.aa_alcance=${types}`);
            }
            else {
                rows = yield db.qwerty(`SELECT 
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
            }
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
            var id = req.body.id;
            var rows = yield db.qwerty(`SELECT aa_id as id, aa_nombre as name, aa_descripcion as description FROM aspectoautoconsciencia WHERE suj_id=${id}`);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_aspects = get_aspects;
function get_aspects_ind(req, res) {
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
exports.get_aspects_ind = get_aspects_ind;
function add_aspects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAspect = req.body;
            var modelID = req.session.active_model.modelID;
            var aspect = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(-1, newAspect.name, newAspect.description, newAspect.weigth, newAspect.type);
            aspect.active = aspect.active;
            var rows = yield db.qwerty(aspect.toSqlInsert(["/@/OBJECT/@/", "/@/SUBJECT/@/", "/@/MODEL/@/", "/@/ALCANCE/@/"], [newAspect.obj_id, newAspect.suj_id, modelID, newAspect.aa_alcance]));
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
function get_aspects_individuales(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var id = req.body.id;
            var rows = yield db.qwerty(`SELECT aa_id as id, aa_nombre as name, aa_descripcion as description FROM aspectoautoconsciencia WHERE suj_id=${id} AND aa_alcance=53`);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_aspects_individuales = get_aspects_individuales;
function add_aspects_colective(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAspect = req.body;
            var modelID = req.session.active_model.modelID;
            var aspect = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(-1, newAspect.name, newAspect.description, newAspect.weigth, newAspect.type);
            aspect.active = aspect.active;
            console.log(aspect.active);
            var rows = yield db.qwerty(`INSERT INTO
aspectoautoconsciencia (
                aa_nombre,
                aa_descripcion,
                aa_peso,
                aa_tipo,
                aa_activo,
		aa_alcance,
		aa_operador,
                suj_id,
                ma_id
            ) VALUES (
                '${newAspect.name}',
                '${newAspect.description}',
                '${newAspect.weigth}',
                '${newAspect.type}',
                '1',
                '${newAspect.aa_alcance}',
		${newAspect.operador},
		'${newAspect.suj_id}',
                '${modelID}'
            )`);
            aspect.id = rows.insertId;
            yield add_relation_aspects_indi_aspects_colec(aspect.id, modelID, newAspect.arr_aspects);
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.add_aspects_colective = add_aspects_colective;
function add_relation_aspects_indi_aspects_colec(aa_id, modelID, arr_asp) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        for (var i = 0; i < arr_asp.length; i++) {
            yield db.qwerty(`INSERT INTO aspectoautoconsciencia_derivado (aad_padre,aad_hijo) values (${aa_id},${arr_asp[i]})`);
        }
    });
}
exports.add_relation_aspects_indi_aspects_colec = add_relation_aspects_indi_aspects_colec;
function get_aspects_colective(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modelID = req.session.active_model.modelID;
            var aspects = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(-1, "", "", -1, "");
            var rows = yield db.qwerty(`
		SELECT
	      asp.aa_id as id,
	      asp.aa_nombre as name,
              asp.aa_descripcion as description,
	      asp.aa_peso as weigth,
              asp.aa_tipo as tipo_id,
              enu.enu_nombre_valor as met_aspect,
              asp.suj_id as suj,
              suj.suj_nombre as sujeto,
              asp.ma_id as model,
              asp.aa_activo as active,
	      asp.aa_operador as operador
	         FROM
	      aspectoautoconsciencia asp,
              enumeracion enu,
              sujeto suj
	         WHERE
		 asp.aa_alcance=54 AND
	      enu.enu_id=asp.aa_tipo AND
	   	 asp.suj_id= suj.suj_id AND
	        suj.ma_id = ${modelID} AND
	        asp.ma_id=${modelID}`);
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_aspects_colective = get_aspects_colective;
function get_aspects_padres(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modeloID = (_b = req.session) === null || _b === void 0 ? void 0 : _b.active_model.modelID;
            var system = req.body.systemID;
            var rows = yield db.qwerty(`SELECT 
	    asp_dev.aad_padre as id_padre
	    FROM 
	     aspectoautoconsciencia_derivado asp_dev,
	      aspectoautoconsciencia asp
	    WHERE
	     asp_dev.aad_hijo=${system} AND asp.aa_id=asp_dev.aad_hijo`);
            res.json(rows);
        }
        else {
            res.json({ error: "Debe iniciar sesion para poder usar la api" });
        }
    });
}
exports.get_aspects_padres = get_aspects_padres;
function mod_aspects_colective(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newAspect = req.body;
            var modelID = req.session.active_model.modelID;
            var aspect = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(-1, newAspect.name, newAspect.description, newAspect.weigth, newAspect.type);
            aspect.active = aspect.active;
            var rows = yield db.qwerty(`UPDATE
aspectoautoconsciencia 
SET	
                aa_nombre= '${newAspect.name}',
                aa_descripcion='${newAspect.description}',
                aa_peso= '${newAspect.weigth}',
                aa_tipo= '${newAspect.type}',
                aa_activo='${newAspect.active ? 1 : 0}',
		aa_operador=${newAspect.operador}
             WHERE 
		aa_id='${newAspect.id}'
	    `);
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.mod_aspects_colective = mod_aspects_colective;
function get_aspects_hijos(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modeloID = (_b = req.session) === null || _b === void 0 ? void 0 : _b.active_model.modelID;
            var id = req.body.id;
            var rows = yield db.qwerty(`SELECT asp.aa_id as id, asp.aa_nombre as name, asp.aa_descripcion as description 
	    FROM aspectoautoconsciencia asp INNER JOIN aspectoautoconsciencia_derivado asp_dev ON asp.aa_id=asp_dev.aad_hijo 
	    WHERE asp_dev.aad_padre=${id}`);
            res.json(rows);
        }
        else {
            res.json({ error: "Debe iniciar sesion para poder usar la api" });
        }
    });
}
exports.get_aspects_hijos = get_aspects_hijos;
function get_aspects_hijos_seleccionados(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var modeloID = (_b = req.session) === null || _b === void 0 ? void 0 : _b.active_model.modelID;
            var id = req.body.id;
            var rows = yield db.qwerty(`
	    SELECT 
	    aad.aad_hijo as hijos
	    FROM 
	    aspectoautoconsciencia_derivado aad 
	    WHERE
	    aad.aad_padre=${id}`);
            res.json(rows);
        }
        else {
            res.json({ error: "Debe iniciar sesion para poder usar la api" });
        }
    });
}
exports.get_aspects_hijos_seleccionados = get_aspects_hijos_seleccionados;
