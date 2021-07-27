"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorQ = void 0;
const Indicator_1 = require("../Indicator");
class IndicatorQ extends Indicator_1.Indicator {
    toSqlInsert(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT 
	  	mt.met_id as id,
		mt.met_nombre as name,
		mt.met_descripcion as description, 
		mt.met_abreviacion as abreviacion,
		mt.met_perspectivaindicador as perspectiva

	     FROM 
	     	metrica mt, 
		metodoaprendizajerazonamiento mea 
	     WHERE 
	  	mea.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
	  	mt.met_id=mea.met_id AND
	  	mt.met_tipo=12`;
        return sql;
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        var indicator = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new IndicatorQ(rows[i].id, rows[i].name, rows[i].description, rows[i].abreviacion, rows[i].perspectiva);
            indicator.push(aux);
        }
        return indicator;
    }
}
exports.IndicatorQ = IndicatorQ;
