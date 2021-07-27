"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementUnitQ = void 0;
const MeasurementUnit_1 = require("../MeasurementUnit");
class MeasurementUnitQ extends MeasurementUnit_1.MeasurementUnit {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO
        unidadmedicion (
                um_nombre,
                um_descripcion,
                um_acronimo,
                um_activo
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.acronym}',
                '${this.active ? 1 : 0}'

            )`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = "";
        if (tag.indexOf("/@/METRIC/@/") != -1) {
            sql = `SELECT
		un.um_id as id,
		un.um_nombre as name,
		un.um_descripcion as descripcion,
		un.um_acronimo as acronimo
	   	FROM
		unidadmedicion un,
		metrica met
	   	WHERE
	   	met.met_id=${value[tag.indexOf("/@/METRIC/@/")]} AND
	   	met.um_id=un.um_id`;
        }
        else {
            var sql = `SELECT 
    um_id as id,
    um_nombre as name,
    um_descripcion as description,
    um_acronimo as acronym,
    um_activo as active
         FROM 
         unidadmedicion`;
        }
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM unidadmedicion WHERE um_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE 
    unidadmedicion
    SET
    um_nombre='${this.name}', 
    um_descripcion='${this.description}',
    um_acronimo='${this.acronym}',
    um_activo=${this.active ? 1 : 0}
  WHERE 
    um_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        var unidad = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new MeasurementUnitQ(rows[i].id, rows[i].name, rows[i].descripcion, rows[i].acronimo);
            unidad.push(aux);
        }
        return unidad;
    }
}
exports.MeasurementUnitQ = MeasurementUnitQ;
