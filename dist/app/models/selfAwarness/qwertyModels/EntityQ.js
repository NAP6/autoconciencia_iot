"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityQ = void 0;
const Entity_1 = require("../Entity");
class EntityQ extends Entity_1.Entity {
    toSqlInsert(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlSelect(tag, value) {
        return `SELECT 
                    o.obj_id as id, 
                    o.obj_tipo as tipo, 
                    o.obj_nombre as nombre, 
                    o.obj_activo as activo, 
                    o.obj_padre as padre 
                    FROM 
                    objeto as o,
                    sujeto_objeto as os 
                    WHERE 
                    o.obj_id = os.obj_id AND 
                    o.ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND 
                    os.ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND 
                    o.obj_tipo IN (${value[tag.indexOf("/@/TYPE/@/")]}) AND 
                    os.suj_id = ${value[tag.indexOf("/@/SYSTEM/@/")]}  AND
		    o.obj_padre = ${value[tag.indexOf("/@/OBJECT/@/")]}
                    ORDER BY id`;
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.EntityQ = EntityQ;
