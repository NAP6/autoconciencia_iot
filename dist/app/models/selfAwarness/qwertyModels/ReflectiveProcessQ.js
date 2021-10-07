"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectiveProcessQ = void 0;
const ReflectiveProcess_1 = require("../ReflectiveProcess");
class ReflectiveProcessQ extends ReflectiveProcess_1.ReflectiveProcess {
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
    ma_id,
    pa_tipo_ejecucion,
    pa_unidad_tiempo,
    pa_intervalo_ejecucion,
    pa_hora_ejecucion) 
    values (
    '${this.name}',
    '${this.description}',
    ${this.executionPeriodStart == undefined
            ? "NULL"
            : "'" + this.executionPeriodStart + "'"},
    ${this.executionPeriodEnd == undefined
            ? "NULL"
            : "'" + this.executionPeriodEnd + "'"},
    ${this.active ? 1 : 0},			
    ${value[tag.indexOf("/@/ASPECTID/@/")]},
    ${value[tag.indexOf("/@/SUBJECT/@/")]},
    ${this.type_process},
${value[tag.indexOf("/@/MODEL/@/")]},
${this.executionType == undefined ? "NULL" : this.executionType},
${value[tag.indexOf("/@/HORA/@/")] == undefined ? "NULL" : "'" + value[tag.indexOf("/@/HORA/@/")] + "'"},
${this.executionTimeInterval == undefined ? "NULL" : this.executionTimeInterval},
${this.executionTime == undefined ? "NULL" : this.executionTime})`;
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
    proceso.pa_tipo=18
	  `;
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM procesoautoconsciencia WHERE pa_id=${this.id}`;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var activo;
        var sql = ``;
        return sql;
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.ReflectiveProcessQ = ReflectiveProcessQ;
