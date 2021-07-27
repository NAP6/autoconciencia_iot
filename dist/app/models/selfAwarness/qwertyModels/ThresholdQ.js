"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThresholdQ = void 0;
const Threshold_1 = require("../Threshold");
class ThresholdQ extends Threshold_1.Threshold {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO
            umbral (
                umb_nombre,
                umb_interpretacion,
                umb_inferior,
                umb_superior,
                umb_activo,
                cd_id
            ) VALUES (
                '${this.name}',
                '${this.interpretation}',
                '${this.lowerThreshold}',
                '${this.upperThreshold}',
                '${this.active ? 1 : 0}',
                '${value[tag.indexOf("/@/CRITERIA/@/")]}'

            )`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = "";
        if (tag.indexOf("/@/RELATION_ACTION/@/") != -1) {
            sql = `	SELECT
      		aa.acc_id id
	    	FROM
		accion aa
		WHERE
		aa.umb_id=${this.id}
	    `;
        }
        else {
            sql = `SELECT 
    umb_id as id,
    umb_nombre as name,
    umb_interpretacion as interpretacion,
    umb_inferior as inferior,
    umb_superior as superior,
    cd_id as id_decicion,
    umb_activo as active
            FROM 
            umbral
            WHERE
            cd_id=${value[tag.indexOf("/@/CRITERIA/@/")]}`;
        }
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM umbral WHERE umb_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE 
    umbral
    SET
    umb_nombre='${this.name}', 
    umb_interpretacion='${this.interpretation}',
    umb_inferior='${this.lowerThreshold}',
    umb_superior='${this.upperThreshold}',
    umb_activo=${this.active ? 1 : 0}
  WHERE 
    umb_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        var threshold = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new ThresholdQ(rows[i].id, rows[i].name, rows[i].interpretacion, rows[i].inferior, rows[i].superior);
            threshold.push(aux);
        }
        return threshold;
    }
}
exports.ThresholdQ = ThresholdQ;
