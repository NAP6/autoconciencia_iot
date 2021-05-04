"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreReflectiveProcessQ = void 0;
const PreReflectiveProcess_1 = require("../PreReflectiveProcess");
class PreReflectiveProcessQ extends PreReflectiveProcess_1.PreReflectiveProcess {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO 
	       procesoautoconsciencia(
	       pa_nombre,
	       pa_descripcion,
	       pa_inicio_periodo_ejecucion,
	       pa_fin_periodo_ejecucion,
	       pa_activo,
	       aa_id,
	       suj_id,
               pa_tipo,
	       ma_id) 
	       values (
	      '${this.name}',
	      '${this.description}',
	      ${this.executionPeriodStart == undefined
            ? "NULL"
            : "'" + this.executionPeriodStart + "'"},
	     ${this.executionPeriodEnd == undefined
            ? "NULL"
            : "'" + this.executionPeriodEnd + "'"},
		${this.active},
		${value[tag.indexOf("/@/ASPECTID/@/")]},
		${value[tag.indexOf("/@/SUBJECT/@/")]},
		${this.type_process},
		${value[tag.indexOf("/@/MODEL/@/")]})`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT
	  proceso.pa_id as id,
		  proceso.pa_nombre as nombre,
		  proceso.pa_descripcion as descripcion,
		  DATE_FORMAT(proceso.pa_inicio_periodo_ejecucion,"%Y-%m-%d") as inicio,
		  DATE_FORMAT(proceso.pa_fin_periodo_ejecucion,"%Y-%m-%d") as fin,
		  proceso.aa_id as aspecto_id,
		  asp.aa_nombre as aspecto,
		  suj.suj_nombre as sujeto,
		  proceso.suj_id as sujeto_id,
		  proceso.pa_activo as activo
	  	  FROM 
		  procesoautoconsciencia proceso,
		  aspectoautoconsciencia asp, 
		  sujeto suj 
	  	  WHERE
	          proceso.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  	  suj.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
		  asp.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
		  proceso.aa_id=asp.aa_id AND
		  proceso.suj_id=suj.suj_id AND
		  proceso.pa_tipo=17
		  `;
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM procesoautoconsciencia WHERE pa_id=${this.id}`;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE
	  procesoautoconsciencia
	  SET
	  pa_descripcion='${this.description}',
		  pa_inicio_periodo_ejecucion='${this.executionPeriodStart}',
		  pa_fin_periodo_ejecucion='${this.executionPeriodEnd}' 
	  WHERE
	  pa_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.PreReflectiveProcessQ = PreReflectiveProcessQ;
