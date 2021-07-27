"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationVariableQ = void 0;
const SimulationVariable_1 = require("../SimulationVariable");
class SimulationVariableQ extends SimulationVariable_1.SimulationVariable {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO
	  	variablesimulacion (
  		vs_nombre,
  		vs_activo,
		mea_id)
	  	VALUES(
  		'${this.name}',
  		${this.active ? 1 : 0},
		${value[tag.indexOf("/@/METHOD/@/")]})`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT
	  	vs_id as id,
		vs_nombre as name,
	  	vs_activo as active
	  	FROM
	  	variablesimulacion
	  	WHERE
	  	mea_id=${value[tag.indexOf("/@/METHOD/@/")]}`;
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM variablesimulacion WHERE vs_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE
    		variablesimulacion
		SET
		        vs_nombre='${this.name}', 
			vs_activo=${this.active ? 1 : 0}
		WHERE 
	    		vs_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        var simulation = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new SimulationVariableQ(rows[i].id, rows[i].name);
            simulation.push(aux);
        }
        return simulation;
    }
}
exports.SimulationVariableQ = SimulationVariableQ;
