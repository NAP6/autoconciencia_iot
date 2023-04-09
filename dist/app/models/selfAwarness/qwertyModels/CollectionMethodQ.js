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
	        	${
              (_b = this.isSupported) === null || _b === void 0
                ? void 0
                : _b.communicationType
            },
	        	${
              (_c = this.collectsProperty[0]) === null || _c === void 0
                ? void 0
                : _c.id
            },
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
			enu.enu_nombre_valor as comunicacion_nombre,
    			mr.pro_id as propiedad, 
    			mr.flu_id as flujo, 
    			mr.obj_id as objeto  
		FROM 
			metodorecoleccion mr, 
			metodoaprendizajerazonamiento mea, 
			procesoautoconsciencia pro,
			enumeracion enu
		WHERE 
			mr.mea_id=mea.mea_id AND 
			pro.pa_id=${value[tag.indexOf("/@/PROCES/@/")]} AND 
			pro.pa_id=mea.pa_id AND
			enu.enu_id=mr.mr_tipo_comunicacion
		`;
    return sql;
  }
  toSqlDelete(tag, value) {
    throw new Error("Method not implemented.");
  }
  toSqlUpdate(tag, value) {
    throw new Error("Method not implemented.");
  }
  toSqlSelectPathDataColum() {
    var sql = `
	  SELECT 
			dc.data_column_path as path
	  FROM
	  	relation_process_mapeo bat JOIN
	  	(metodorecoleccion coll, data_column dc) ON
				coll.pro_id = bat.id_proces AND
	  		coll.flu_id = bat.id_flow AND
	  		coll.ma_id = bat.ma_id AND
	          dc.ma_id = bat.ma_id AND
	          dc.data_id = bat.id_colum
	  WHERE
	  	coll.mea_id = ${this.id}
	  `;
    return sql;
  }
  toObjectArray(rows) {
    var res = [];
    for (var i = 0; i < rows.length; i++) {
      var aux = new CollectionMethodQ(
        rows[i].metodoAprend_id,
        rows[i].comunicacion_nombre
      );
      res.push(aux);
    }
    return res;
  }
}
exports.CollectionMethodQ = CollectionMethodQ;
