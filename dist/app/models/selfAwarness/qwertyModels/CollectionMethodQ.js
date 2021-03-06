"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionMethodQ = void 0;
const CollectionMethod_1 = require("../CollectionMethod");
class CollectionMethodQ extends CollectionMethod_1.CollectionMethod {
    toSqlInsert(tag, value) {
        var _a, _b, _c, _d;
        var sql = `call MetodoRecoleccion(
	        	${value[tag.indexOf("/@/PROCES/@/")]},
	        	${value[tag.indexOf("/@/MODEL/@/")]},
	        	${(_a = this.produces) === null || _a === void 0 ? void 0 : _a.id},
	        	${(_b = this.isSupported) === null || _b === void 0 ? void 0 : _b.communicationType},
	        	${(_c = this.collectsProperty[0]) === null || _c === void 0 ? void 0 : _c.id},
	        	${(_d = this.isSupported) === null || _d === void 0 ? void 0 : _d.id},
	        	${value[tag.indexOf("/@/OBJECT/@/")]},
			@id)`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT 
    mr.mea_id as metodoAprend_id,
    mea.mea_tipo as tipo_metodo,
    mea.pa_id as proceso_id,
    mea.met_id as metrica_id,
    mr.mr_tipo_comunicacion as comunicacion,
    mr.pro_id as propiedad, 
    mr.flu_id as flujo, 
    mr.obj_id as objeto  
		FROM 
		metodorecoleccion mr, 
		metodoaprendizajerazonamiento mea, 
		procesoautoconsciencia pro 
		WHERE 
		mr.mea_id=mea.mea_id AND 
		pro.pa_id=${value[tag.indexOf("/@/PROCES/@/")]} AND 
		pro.pa_id=mea.pa_id
		`;
        return sql;
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
exports.CollectionMethodQ = CollectionMethodQ;
