"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricQ = void 0;
const Metric_1 = require("../Metric");
class MetricQ extends Metric_1.Metric {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO
            metrica (
                met_nombre,
                met_descripcion,
                met_abreviacion,
                met_tipo,
                met_perspectivaindicador,
                met_activo,
                esc_id,
                um_id
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.abbreviation}',
                '${value[tag.indexOf("/@/TYPE/@/")]}',
                '${this.perspective}',
                '${this.active ? 1 : 0}',
                '${value[tag.indexOf("/@/ESCALE/@/")]}',
                '${value[tag.indexOf("/@/UNIT/@/")]}'

            )`;
        return sql;
    }
    toSqlSelect() {
        var sql = `SELECT 
    met.met_id as id, 
    met.met_nombre as name,
    met.met_descripcion as description,
    met.met_abreviacion as abbreviation,
    met.met_perspectivaindicador as perspectiva,
    met.met_tipo as tipo_id,
    enu.enu_nombre_valor as met_type,
    met.esc_id as scale,
    met.um_id as unit,
    met.met_activo as active
  FROM 
    metrica met,
    enumeracion enu
  WHERE 
    enu.enu_id=met.met_tipo`;
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM metrica WHERE met_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var activo;
        var sql = `UPDATE 
    metrica
    SET
    met_nombre='${this.name}', 
    met_descripcion='${this.description}',
    met_abreviacion='${this.abbreviation}',
    met_perspectivaindicador='${this.perspective}',
    met_tipo='${value[tag.indexOf("/@/TYPE/@/")]}',
    esc_id='${value[tag.indexOf("/@/ESCALE/@/")]}',
    um_id='${value[tag.indexOf("/@/UNIT/@/")]}',
    met_activo='${this.active ? 1 : 0}'
  WHERE 
    met_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.MetricQ = MetricQ;
