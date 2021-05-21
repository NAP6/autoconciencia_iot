"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImplementationResourceQ = void 0;
const ImplementationResource_1 = require("../ImplementationResource");
class ImplementationResourceQ extends ImplementationResource_1.ImplementationResource {
    toSqlInsert(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlSelect(tag, value) {
        if (tag.indexOf("/@/ALL/@/") != -1)
            return `call get_recurso(${this.id})`;
        var sql = `SELECT 
				ri_id as id, 
				ri_nombre as nombre, 
				ri_descripcion as descripcion, 
				ri_tipo_dato_salida as tipo_salida, 
				ri_activo as activo, 
				ri_tipo_recurso as tipo_recurso 
			   FROM 
				recursoimplementacion`;
        if (tag.indexOf("/@/TYPE/@/") != -1) {
            sql += `
		  	  WHERE
	 			ri_tipo_recurso = '${value[tag.indexOf("/@/TYPE/@/")]}'		  	
			`;
        }
        return sql;
    }
    toSqlDelete(tag, value) {
        var sql = `DELETE FROM recursoimplementacion WHERE ri_id = '${this.id}'`;
        return sql;
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.ImplementationResourceQ = ImplementationResourceQ;
