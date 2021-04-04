"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTGatewayQ = void 0;
const IoTGateway_1 = require("../IoTGateway");
class IoTGatewayQ extends IoTGateway_1.IoTGateway {
    toSqlInsert(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlSelect(tag, value) {
        if (tag.indexOf('/@/SYSTEM/@/') != -1)
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
                o.ma_id = ${value[tag.indexOf('/@/MODEL/@/')]} AND 
                os.ma_id = ${value[tag.indexOf('/@/MODEL/@/')]} AND 
                o.obj_tipo = 'IoTGateway' AND 
                os.suj_id = ${value[tag.indexOf('/@/SYSTEM/@/')]}  
                ORDER BY id`;
        return `SELECT 
            obj_id as id, 
            obj_tipo as tipo, 
            obj_nombre as nombre, 
            obj_activo as activo, 
            obj_padre as padre 
            FROM 
            objeto 
            WHERE ma_id = ${value[tag.indexOf('/@/MODEL/@/')]} AND 
            obj_tipo = 'IoTGateway'  
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
exports.IoTGatewayQ = IoTGatewayQ;
