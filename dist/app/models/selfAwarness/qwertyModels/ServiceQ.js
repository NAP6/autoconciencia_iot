"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceQ = void 0;
const Service_1 = require("../Service");
class ServiceQ extends Service_1.Service {
    toSqlInsert(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlSelect(tag, value) {
        if (tag.indexOf("/@/SYSTEM/@/") != -1)
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
                o.ma_id = os.ma_id AND 
                os.ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND 
                o.obj_tipo = 'Service' AND 
                os.suj_id = ${value[tag.indexOf("/@/SYSTEM/@/")]} AND
		o.obj_padre IN(${value[tag.indexOf("/@/FATHERS/@/")]})
                ORDER BY id`;
        return `SELECT 
            obj_id as id, 
            obj_tipo as tipo, 
            obj_nombre as nombre, 
            obj_activo as activo, 
            obj_padre as padre 
            FROM 
            objeto 
            WHERE ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND 
            obj_tipo = 'FogNode'  
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
exports.ServiceQ = ServiceQ;
