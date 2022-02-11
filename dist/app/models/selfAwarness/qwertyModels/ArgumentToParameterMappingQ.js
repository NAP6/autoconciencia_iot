"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentToParameterMappingQ = void 0;
const ArgumentToParameterMapping_1 = require("../ArgumentToParameterMapping");
class ArgumentToParameterMappingQ extends ArgumentToParameterMapping_1.ArgumentToParameterMapping {
    toSqlInsert(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT
    		  map.mp_tipo_entrada as tipo_entrada,
		  map.met_id as metrica,
		  map.vs_id as variable,
		  map.md_id as id,
		  map.data_id as metadata
	  FROM
	  mapeoparametros map,
		  metodoaprendizajerazonamiento mea
	  WHERE
	  mea.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
	  mea.mea_id=map.mea_id`;
        return sql;
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        var mapping = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new ArgumentToParameterMappingQ(rows[i].id);
            if (rows[i].variable) {
                aux.simulation_variable = rows[i].variable;
            }
            if (rows[i].metadata) {
                aux.metadata = rows[i].metadata;
            }
            mapping.push(aux);
        }
        return mapping;
    }
}
exports.ArgumentToParameterMappingQ = ArgumentToParameterMappingQ;
