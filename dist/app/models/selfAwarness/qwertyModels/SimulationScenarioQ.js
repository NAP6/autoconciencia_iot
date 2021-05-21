"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationScenarioQ = void 0;
const SimulationScenario_1 = require("../SimulationScenario");
class SimulationScenarioQ extends SimulationScenario_1.SimulationScenario {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO escenariosimulacion(es_nombre,es_descripcion,es_activo,mea_id)VALUES('${this.name}','${this.description}',
		  ${this.active ? 1 : 0},${value[tag.indexOf("/@/METHOD/@/")]})`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT
	  	es_id as id,
		es_nombre as name,
		es_descripcion as description,
		es_activo as active
		FROM
		escenariosimulacion
		WHERE
		mea_id=${value[tag.indexOf("/@/METHOD/@/")]}
	  	`;
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM escenariosimulacion WHERE es_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE
	  	escenariosimulacion
	  	SET
	  	es_nombre='${this.name}',
		  es_descripcion='${this.description}',
		  es_activo='${this.active ? 1 : 0}'
		  WHERE
	 	es_id=${this.id}
		  `;
        return sql;
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.SimulationScenarioQ = SimulationScenarioQ;
