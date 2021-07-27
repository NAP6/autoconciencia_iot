"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectMetricQ = void 0;
const DirectMetric_1 = require("../DirectMetric");
class DirectMetricQ extends DirectMetric_1.DirectMetric {
    toSqlInsert(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT 
	  	mt.met_id as id,
		mt.met_nombre as name,
		mt.met_descripcion as description, 
		mt.met_abreviacion as abreviacion
	     FROM 
	     	metrica mt, 
		metodoaprendizajerazonamiento mea 
	     WHERE 
	  	mea.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
	  	mt.met_id=mea.met_id AND
	  	mt.met_tipo=10`;
        return sql;
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        var directMetric = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new DirectMetricQ(rows[i].id, rows[i].name, rows[i].description, rows[i].abreviacion);
            directMetric.push(aux);
        }
        return directMetric;
    }
}
exports.DirectMetricQ = DirectMetricQ;
