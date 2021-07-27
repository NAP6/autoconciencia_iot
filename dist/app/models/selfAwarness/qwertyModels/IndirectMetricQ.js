"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndirectMetricQ = void 0;
const IndirectMetric_1 = require("../IndirectMetric");
class IndirectMetricQ extends IndirectMetric_1.IndirectMetric {
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
		mt.met_tipo=11;
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
        var directMetric = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new IndirectMetricQ(rows[i].id, rows[i].name, rows[i].description, rows[i].abreviacion);
            directMetric.push(aux);
        }
        return directMetric;
    }
}
exports.IndirectMetricQ = IndirectMetricQ;
